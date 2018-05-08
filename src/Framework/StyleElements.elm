module Framework.StyleElements exposing (introspection)

{-| [Demo](https://lucamug.github.io/elm-style-framework/framework.html)

Style-elements (Alpha version) Examples


# Functions

@docs introspection

-}

import Element exposing (Element, column, decorativeImage, download, downloadAs, el, image, link, newTabLink, none, row, spacing, text)


{-| Used to generate the [Style Guide](https://lucamug.github.io/elm-style-framework/)
-}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Style-Elements"
    , description = "This is a raw list of all elements of style-elements as they are"
    , signature = ""
    , variations =
        [ ( "Basic Elements"
          , [ ( none, """none""" )
            , ( text "text", """text "text\"""" )
            , ( el [] <| text "el", """el [] <| text "el\"""" )
            ]
          )
        , ( "Rows and Columns"
          , [ ( row [ spacing 20 ] [ text "item 1", text "item 2" ], """row [ spacing 20 ] [ text "item 1", text "item 2" ]""" )
            , ( column [ spacing 20 ] [ text "item 1", text "item 2" ], """column [ spacing 20 ] [ text "item 1", text "item 2" ]""" )
            ]
          )
        , ( "Links and Images"
          , [ ( link [] { url = "http://example.com", label = text "link" }, """link [] { url = "http://example.com", label = text "label" }""" )
            , ( newTabLink [] { url = "http://example.com", label = text "newTabLink" }, """newTabLink [] { url = "http://example.com", label = text "newTabLink" }""" )
            , ( download [] { url = "http://example.com", label = text "download" }, """download [] { url = "http://example.com", label = text "download" }""" )
            , ( downloadAs [] { url = "http://example.com", label = text "downloadAs", filename = "filename" }, """downloadAs [] { url = "http://example.com", label = text "downloadAs", filename = "filename" }""" )

            --, ( image [] { src = "http://placekitten.com/100/100", description = "description" }, """image [] { src = "https://placebear.com/300/200", description = "description" }""" )
            , ( image [] { src = "http://via.placeholder.com/200x100/ff3399/000", description = "description" }, """image [] { src = "http://via.placeholder.com/200x100/ff3399/000", description = "description" }""" )
            , ( decorativeImage [] { src = "http://via.placeholder.com/200x100/ff3399/000" }, """decorativeImage [] { src = "http://via.placeholder.com/200x100/ff3399/000" }""" )
            ]
          )
        ]
    }
