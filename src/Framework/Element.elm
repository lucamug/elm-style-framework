module Framework.Element exposing (..)

{-| Buttons generator

Check [Style Guide](https://lucamug.github.io/elm-style-framework/) to see usage examples.


# Functions

@docs button, buttonAttr, introspection

-}

--import Color.Manipulate

import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Framework.Color as Color
import Framework.Modifiers as Modifiers exposing (..)
import Framework.Spinner as Spinner
import Styleguide


{-| Used to generate the [Style Guide](https://lucamug.github.io/elm-style-framework/)
-}
introspection : Styleguide.Introspection msg
introspection =
    { name = "Style-Elements"
    , signature = ""
    , description = "This is a raw list of all elements of style-elements as they are"
    , usage = ""
    , usageResult = empty
    , boxed = True
    , types =
        [ ( "Basic Elements"
          , [ ( empty, """empty""" )
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
