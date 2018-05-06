module Framework.Typography exposing (h1, h2, h3, h4, h5, h6, introspection, textExtraSmall, textLead, textSmall)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Typography/Heading)


# Functions

@docs h1, h2, h3, h4, h5, h6, introspection, textExtraSmall, textLead, textSmall

-}

import Element exposing (Element, alignLeft, paddingEach, text)
import Element.Font as Font
import Element.Region as Region


{-| -}
introspection :
    { boxed : Bool
    , description : String
    , name : String
    , signature : String
    , usage : String
    , usageResult : Element msg
    , variations : List ( String, List ( Element msg1, String ) )
    }
introspection =
    { name = "Typography"
    , signature = "List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg"
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
            , ( textLead [] <| text "textLead", """textLead [] <| text "textLead\"""" )
            , ( textSmall [] <| text "textSmall", """textSmall [] <| text "textSmall\"""" )
            , ( textExtraSmall [] <| text "textExtraSmall", """textExtraSmall [] <| text "textExtraSmall\"""" )
            ]
          )
        ]
    }


{-| -}
h1 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h1 listAttr element =
    heading SizeH1 listAttr element


{-| -}
h2 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h2 =
    heading SizeH2


{-| -}
h3 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h3 =
    heading SizeH3


{-| -}
h4 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h4 =
    heading SizeH4


{-| -}
h5 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h5 =
    heading SizeH5


{-| -}
h6 : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
h6 =
    heading SizeH6


{-| -}
textLead : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
textLead =
    textSection SizeLead


{-| -}
textSmall : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
textSmall =
    textSection SizeSmall


{-| -}
textExtraSmall : List (Element.Attribute msg) -> Element.Element msg -> Element.Element msg
textExtraSmall =
    textSection SizeExtraSmall


textSection :
    FontLevel
    -> List (Element.Attr () msg)
    -> Element msg
    -> Element msg
textSection level attributes child =
    Element.el
        ((Font.size <| fontSize level)
            :: attributes
        )
        child


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
