#!/usr/bin/python

import argparse
import json
import io
import os
import re
import sys


re_import = re.compile(r"{-.*?-}|^import\s+([A-Z][\w\.]*)", re.DOTALL | re.MULTILINE)

# source text -> [modulename]
def extract_imports(text):
    return filter(lambda s: s != "" and s[0:7] != "Native.", re_import.findall(text))


# source text -> modulename
def extract_modulename(text):
    match = re.match(r"(?:port )?module\s+([A-Z][\w\.]*)", text)
    return match.group(1) if match is not None else None


# repo path -> "<user>/<project>"
def extract_packagename(repository):
    match = re.search(r"([^\/]+\/[^\/]+?)(\.\w+)?$", repository)
    return match.group(1) if match is not None else None


# -> maybe filepath of nearest elm-package.json
def find_elmpackagejson(path):
    elmpackagejson = os.path.join(path, "elm-package.json")
    if not os.path.exists(path) or os.path.ismount(path):
        return None
    elif os.path.isfile(elmpackagejson):
        return elmpackagejson
    else:
        return find_elmpackagejson(os.path.dirname(path))


# -> {"sourcedirs": [dir], "dependencies": [packagename]}
def get_packageinfo(packagedir):
    elmpackagedata = json.load(open(os.path.join(packagedir, "elm-package.json")))
    return {
        "sourcedirs": map(
            lambda dir: os.path.normpath(os.path.join(packagedir, dir)),
            elmpackagedata.get("source-directories", [])
        ),
        "dependencies": elmpackagedata.get("dependencies", {}).keys()
    }


# -> (packagename, modulename, sourcepath)
def find_importedmodule(packages, packagename, importedmodulename):
    sourcedirs = map(tuple(packagename), packages[packagename]["sourcedirs"])
    dependencysourcedirs = concatmap(lambda dep: map(tuple(dep), packages[dep]["sourcedirs"]), packages[packagename]["dependencies"])

    segments = importedmodulename.split(".")
    for (importedpackagename, sourcedir) in (sourcedirs + dependencysourcedirs):
        sourcepath = os.path.join(sourcedir, *segments) + ".elm"
        if os.path.isfile(sourcepath):
            return (importedpackagename, importedmodulename, sourcepath)

    print "warning: source file not found for module (" + importedmodulename +") as imported from (" + packagename + ")"
    return None


def tuple(a):
    return lambda b: (a, b)


def concatmap(f, list):
    return reduce(lambda r, x: r + f(x), list, [])


# -> {qualifiedmodulename: {"imports": [qualifiedmodulename], "package": packagename}}
def graph_from_imports(packages, packagename, modulename, importedmodulenames, graph):
    importedmodules = filter(
        lambda x: x is not None,
        map(lambda m: find_importedmodule(packages, packagename, m), importedmodulenames)
    )
    graph[qualify(packagename, modulename)] = {
        "imports": map(lambda (p, m, _): qualify(p, m), importedmodules),
        "package": packagename
    }
    return reduce(
        lambda g, (p, m, sourcepath): graph_from_imports(packages, p, m, extract_imports(open(sourcepath).read()), g),
        filter(
            lambda (p, m, _): qualify(p, m) not in graph,
            importedmodules
        ),
        graph
    )


def qualify(packagename, modulename):
    return packagename + " " + modulename


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-o", "--output", default="module-graph.json", help="file to write to (default: module-graph.json)")
    parser.add_argument("filepath", help="path to .elm file or elm-package.json")
    args = parser.parse_args()

    filepath = os.path.abspath(args.filepath)

    if not os.path.isfile(filepath):
        print "error: file not found: " + filepath
        sys.exit(1)

    elmpackagejson = filepath if os.path.basename(filepath) == "elm-package.json" else find_elmpackagejson(filepath)

    if elmpackagejson is None:
        print "error: elm-package.json not found for: " + filepath
        sys.exit(1)

    projectdir = os.path.dirname(elmpackagejson)

    if not os.path.exists(os.path.join(projectdir, "elm-stuff")):
        print "error: elm-stuff folder not found (run elm-make and try again)"
        sys.exit(1)

    # packages (dict), projectname, entryname, modulenames (list)
    elmpackagedata = json.load(open(elmpackagejson))
    projectname = extract_packagename(elmpackagedata.get("repository", "")) or "user/project"

    packages = {projectname: get_packageinfo(projectdir)}
    for (packagename, version) in json.load(open(os.path.join(projectdir, "elm-stuff", "exact-dependencies.json"))).items():
        packages[packagename] = get_packageinfo(os.path.join(projectdir, "elm-stuff", "packages", packagename, version))

    if filepath == elmpackagejson:
        entryname = "exposed-modules"
        modulenames = elmpackagedata.get("exposed-modules", [])
    else:
        sourcetext = open(filepath).read()
        entryname = extract_modulename(sourcetext) or "Main"
        modulenames = extract_imports(sourcetext)

    # graph
    modulegraph = graph_from_imports(packages, projectname, entryname, modulenames, {})

    output = io.open(args.output, "w", encoding="utf-8")
    output.write(unicode(json.dumps(modulegraph, indent=2, separators=[",", ": "]), encoding="utf-8-sig"))
    output.close()


if __name__ == "__main__":
    main()
