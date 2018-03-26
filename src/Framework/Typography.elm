module Framework.Typography exposing (..)

--import Element.Background as Background
--import Element.Border as Border
--import Framework.Color exposing (Color(..), color)

import Element exposing (..)
import Element.Font as Font
import Element.Region as Region


{-| -}
introspection =
    { name = "Typography"
    , signature = "h1 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg"
    , description = ""
    , usage = """h1 [] <| text "Content\""""
    , usageResult = h1 [] <| text "Content"
    , boxed = False
    , variations =
        [ ( "Heading"
          , [ ( h1 [] <| text "h1. Heading", """h1 [] <| text "h1. Heading\"""" )
            , ( h2 [] <| text "h2. Heading", """h2 [] <| text "h2. Heading\"""" )
            , ( h3 [] <| text "h3. Heading", """h3 [] <| text "h3. Heading\"""" )
            , ( h4 [] <| text "h4. Heading", """h4 [] <| text "h4. Heading\"""" )
            , ( h5 [] <| text "h5. Heading", """h5 [] <| text "h5. Heading\"""" )
            , ( h6 [] <| text "h6. Heading", """h6 [] <| text "h6. Heading\"""" )
            ]
          )
        ]
    }


h1 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h1 listAttr element =
    heading SizeH1 listAttr element


h2 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h2 =
    heading SizeH2


h3 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h3 =
    heading SizeH3


h4 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h4 =
    heading SizeH4


h5 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h5 =
    heading SizeH5


h6 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h6 =
    heading SizeH6


heading :
    FontLevel
    -> List (Element.Attribute msg)
    -> Element.Element msg
    -> Element.Element msg
heading level attributes child =
    Element.el
        ([ Region.heading <| headingLevel level
         , Font.size <| fontSize level
         , paddingEach { top = 0, right = 0, bottom = 0, left = 0 }
         , alignLeft
         , Font.bold
         ]
            ++ attributes
        )
        child


genericRatio : Float
genericRatio =
    1.4


scaledFontLevel : Int -> Int
scaledFontLevel n =
    round (16 * (genericRatio ^ toFloat n))


type FontLevel
    = SizeH1
    | SizeH2
    | SizeH3
    | SizeH4
    | SizeH5
    | SizeH6
    | SizeLead
    | SizeSmall
    | SizeExtraSmall


headingLevel : FontLevel -> Int
headingLevel level =
    case level of
        SizeH1 ->
            1

        SizeH2 ->
            2

        SizeH3 ->
            3

        SizeH4 ->
            4

        SizeH5 ->
            5

        SizeH6 ->
            6

        _ ->
            5


fontSize : FontLevel -> Int
fontSize level =
    case level of
        SizeH1 ->
            32

        SizeH2 ->
            28

        SizeH3 ->
            24

        SizeH4 ->
            20

        SizeH5 ->
            16

        SizeH6 ->
            14

        SizeLead ->
            24

        SizeSmall ->
            14

        SizeExtraSmall ->
            12
