## How to publish

### Compile the demos

From .
```
$ elm-live src/Framework.elm  --output docs/framework.js --dir=docs --open
```

From .examples
```
$ elm-live ExampleButton.elm  --output ../docs/exampleButton.js --dir=../docs
$ elm-live ExampleDocumentation.elm  --output ../docs/exampleDocumentation.js --dir=../docs
```


## Preview documentation

```
$ elm-make --docs=documentation.json
```

http://package.elm-lang.org/help/docs-preview

## Analyze code


```
$ elm-package bump
```

After this update the version number at the top of Styleguide.elm

## Publish

```
$ elm-package publish
```
