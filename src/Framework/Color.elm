module Framework.Color
    exposing
        ( background
        , black
        , black_bis
        , black_ter
        , blue
        , border
        , border_hover
        , code
        , code_background
        , cyan
        , danger
        , dark
        , green
        , grey
        , grey_dark
        , grey_darker
        , grey_light
        , grey_lighter
        , info
        , introspection
        , light
        , link
        , link_active
        , link_active_border
        , link_focus
        , link_focus_border
        , link_hover
        , link_hover_border
        , link_invert
        , link_visited
        , muted
        , orange
        , pre
        , pre_background
        , primary
        , purple
        , red
        , success
        , text
        , text_light
        , text_strong
        , transparent
        , turquoise
        , warning
        , white
        , white_bis
        , white_ter
        , yellow
        )

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Colors/Gray%20Scale)


# Functions

@docs background, black, black_bis, black_ter, blue, border, border_hover, code, code_background, cyan, danger, dark, green, grey, grey_dark, grey_darker, grey_light, grey_lighter, info, introspection, light, link, link_active, link_active_border, link_focus, link_focus_border, link_hover, link_hover_border, link_invert, link_visited, muted, orange, pre, pre_background, primary, purple, red, success, text, text_light, text_strong, transparent, turquoise, warning, white, white_bis, white_ter, yellow

-}

-- import Color

import Color
import Element exposing (Element, column)
import Element.Background
import Element.Border
import Element.Font
import Framework.ColorManipulation as ColorManipulation
import Framework.Configuration exposing (conf)


{-| -}
introspection :
    { name : String
    , description : String
    , signature : String
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Colors"
    , description = ""
    , signature = "Element.Color"
    , variations =
        [ ( "Colors"
          , [ ( usageWrapper <| orange, "orange" )
            , ( usageWrapper <| yellow, "yellow" )
            , ( usageWrapper <| green, "green" )
            , ( usageWrapper <| turquoise, "turquoise" )
            , ( usageWrapper <| cyan, "cyan" )
            , ( usageWrapper <| blue, "blue" )
            , ( usageWrapper <| purple, "purple" )
            , ( usageWrapper <| red, "red" )
            ]
          )
        , ( "Gray Scale"
          , [ ( usageWrapper <| black, "black" )
            , ( usageWrapper <| black_bis, "black_bis" )
            , ( usageWrapper <| black_ter, "black_ter" )
            , ( usageWrapper <| grey_darker, "grey_darker" )
            , ( usageWrapper <| grey_dark, "grey_dark" )
            , ( usageWrapper <| grey, "grey" )
            , ( usageWrapper <| grey_light, "grey_light" )
            , ( usageWrapper <| grey_lighter, "grey_lighter" )
            , ( usageWrapper <| white_ter, "white_ter" )
            , ( usageWrapper <| white_bis, "white_bis" )
            , ( usageWrapper <| white, "white" )
            ]
          )
        , ( "Derived"
          , [ ( usageWrapper <| primary, "primary" )
            , ( usageWrapper <| info, "info" )
            , ( usageWrapper <| success, "success" )
            , ( usageWrapper <| warning, "warning" )
            , ( usageWrapper <| danger, "danger" )
            , ( usageWrapper <| light, "light" )
            , ( usageWrapper <| dark, "dark" )
            ]
          )
        , ( "Fonts"
          , [ ( usageWrapper <| text, "text" )
            , ( usageWrapper <| text_light, "text_light" )
            , ( usageWrapper <| text_strong, "text_strong" )
            , ( usageWrapper <| code, "code" )
            , ( usageWrapper <| code_background, "code_background" )
            , ( usageWrapper <| pre, "pre" )
            , ( usageWrapper <| pre_background, "pre_background" )
            ]
          )
        , ( "Links"
          , [ ( usageWrapper <| link, "link" )
            , ( usageWrapper <| link_invert, "link_invert" )
            , ( usageWrapper <| link_visited, "link_visited" )
            , ( usageWrapper <| link_hover, "link_hover" )
            , ( usageWrapper <| link_hover_border, "link_hover_border" )
            , ( usageWrapper <| link_focus, "link_focus" )
            , ( usageWrapper <| link_focus_border, "link_focus_border" )
            , ( usageWrapper <| link_active, "link_active" )
            , ( usageWrapper <| link_active_border, "link_active_border" )
            ]
          )
        , ( "Others"
          , [ -- Background
              ( usageWrapper <| background, "background" )

            -- Border
            , ( usageWrapper <| border, "border" )
            , ( usageWrapper <| border_hover, "border_hover" )

            -- Others
            , ( usageWrapper <| transparent, "transparent" )
            , ( usageWrapper <| muted, "muted" )
            ]
          )
        ]
    }


{-| -}
usageWrapper : Element.Color -> Element.Element msg
usageWrapper cl =
    Element.el
        [ Element.Background.color <| cl
        , Element.width <| Element.px 200
        , Element.padding 10
        , Element.Border.rounded 5

        -- 019 , Element.Font.color <| ColorManipulation.maximumContrast cl (Color.hsla 0 0 0 100) (Color.hsla 0 100 100 100)
        ]
    <|
        column []
            [-- Element.text <| ColorManipulation.colorToHex cl
             -- , Element.text <| ColorManipulation.colorToHsl2 cl
            ]


{-| -}
background : Element.Color
background =
    conf.color.background


{-| -}
black : Element.Color
black =
    conf.color.black


{-| -}
black_bis : Element.Color
black_bis =
    conf.color.black_bis


{-| -}
black_ter : Element.Color
black_ter =
    conf.color.black_ter


{-| -}
blue : Element.Color
blue =
    conf.color.blue


{-| -}
border : Element.Color
border =
    conf.color.border


{-| -}
border_hover : Element.Color
border_hover =
    conf.color.border_hover


{-| -}
code : Element.Color
code =
    conf.color.code


{-| -}
code_background : Element.Color
code_background =
    conf.color.code_background


{-| -}
cyan : Element.Color
cyan =
    conf.color.cyan


{-| -}
danger : Element.Color
danger =
    conf.color.danger


{-| -}
dark : Element.Color
dark =
    conf.color.dark


{-| -}
green : Element.Color
green =
    conf.color.green


{-| -}
grey : Element.Color
grey =
    conf.color.grey


{-| -}
grey_dark : Element.Color
grey_dark =
    conf.color.grey_dark


{-| -}
grey_darker : Element.Color
grey_darker =
    conf.color.grey_darker


{-| -}
grey_light : Element.Color
grey_light =
    conf.color.grey_light


{-| -}
grey_lighter : Element.Color
grey_lighter =
    conf.color.grey_lighter


{-| -}
info : Element.Color
info =
    conf.color.info


{-| -}
light : Element.Color
light =
    conf.color.light


{-| -}
link : Element.Color
link =
    conf.color.link


{-| -}
link_active : Element.Color
link_active =
    conf.color.link_active


{-| -}
link_active_border : Element.Color
link_active_border =
    conf.color.link_active_border


{-| -}
link_focus : Element.Color
link_focus =
    conf.color.link_focus


{-| -}
link_focus_border : Element.Color
link_focus_border =
    conf.color.link_focus_border


{-| -}
link_hover : Element.Color
link_hover =
    conf.color.link_hover


{-| -}
link_hover_border : Element.Color
link_hover_border =
    conf.color.link_hover_border


{-| -}
link_invert : Element.Color
link_invert =
    conf.color.link_invert


{-| -}
link_visited : Element.Color
link_visited =
    conf.color.link_visited


{-| -}
muted : Element.Color
muted =
    conf.color.muted


{-| -}
orange : Element.Color
orange =
    conf.color.orange


{-| -}
pre : Element.Color
pre =
    conf.color.pre


{-| -}
pre_background : Element.Color
pre_background =
    conf.color.pre_background


{-| -}
primary : Element.Color
primary =
    conf.color.primary


{-| -}
purple : Element.Color
purple =
    conf.color.purple


{-| -}
red : Element.Color
red =
    conf.color.red


{-| -}
success : Element.Color
success =
    conf.color.success


{-| -}
text : Element.Color
text =
    conf.color.text


{-| -}
text_light : Element.Color
text_light =
    conf.color.text_light


{-| -}
text_strong : Element.Color
text_strong =
    conf.color.text_strong


{-| -}
transparent : Element.Color
transparent =
    conf.color.transparent


{-| -}
turquoise : Element.Color
turquoise =
    conf.color.turquoise


{-| -}
warning : Element.Color
warning =
    conf.color.warning


{-| -}
white : Element.Color
white =
    conf.color.white


{-| -}
white_bis : Element.Color
white_bis =
    conf.color.white_bis


{-| -}
white_ter : Element.Color
white_ter =
    conf.color.white_ter


{-| -}
yellow : Element.Color
yellow =
    conf.color.yellow
