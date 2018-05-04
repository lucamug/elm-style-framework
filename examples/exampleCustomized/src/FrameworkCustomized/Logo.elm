module FrameworkCustomized.Logo exposing (Logo(..), introspection, logo)

{-| [Demo](https://lucamug.github.io/elm-style-framework/#/framework/Logos/Logos)


# Functions

@docs Logo, Color, LogoElmType, logo, introspection

-}

import Element
import Html
import Svg
import Svg.Attributes as SA


{-| -}
introspection :
    { boxed : Bool
    , description : String
    , name : String
    , signature : String
    , usage : String
    , usageResult : Element.Element msg
    , variations : List ( String, List ( Element.Element msg1, String ) )
    }
introspection =
    { name = "Logo Massive Dynamics"
    , signature = "logo : Logo -> Int -> Color.Color -> Element.Element msg"
    , description = "List of SVG logos"
    , usage = "logo ElmColorful 48"
    , usageResult = logo LogoMassiveDynamics 48
    , boxed = True
    , variations =
        [ ( "Logo"
          , [ ( logo LogoMassiveDynamics 100, "logo (LogoElm <| ElmColorful) 100" )
            ]
          )
        ]
    }


{-| SVG Logo
-}
logo : Logo -> Int -> Element.Element msg
logo logo size =
    Element.html <|
        case logo of
            LogoMassiveDynamics ->
                logoMassiveDynamics size


{-| Type of logos
-}
type Logo
    = LogoMassiveDynamics


logoMassiveDynamics : Int -> Html.Html msg
logoMassiveDynamics height =
    Svg.svg
        [ SA.viewBox "0 0 437.2 319.9"
        , SA.height <| toString height
        , SA.width <| toString <| floor <| toFloat height * 1
        ]
        [ Svg.path [ SA.fill "none", SA.d "M0 0h437.1v319.9H0z" ] []
        , Svg.path [ SA.d "M362 38.3l-58 15.4L293.8 20 218.6 0l-75.2 20-10.3 33.7-58-15.5L0 58.3v203.4L58 277l26.5-7.1 4.3 15.3 41 10.9 30.7-8.2v16.4l58 15.5 58.1-15.5V288l30.8 8.2 41-11 4.2-15.2 26.5 7 58-15.4V58.3l-75.1-20z" ] []
        , Svg.path [ SA.fill "#fff", SA.d "M379 175.4H232.3v100.8l75.2 20v-38.3l71.7 19.2V175.4z" ] []
        , Svg.path [ SA.d "M58 175.4v101.7l71.8-19.2v38.3l75.1-20V175.4H58.1zm269.8-44.6l-75 20-34.2-110.7 75-20 34.2 110.7z" ] []
        , Svg.path [ SA.fill "#fff", SA.d "M252.7 150.8L218.6 40.1l-75.2-20-34.1 110.7 143.4 20zm75.2 38.2l-75.2-20L287 58.4l75.1 20L328 189.2z" ] []
        , Svg.path [ SA.d "M109.3 189l75.1-20-34.1-110.7-75.2 20 34.2 110.8zM362 78.3l-34.1 110.8-34.2-92.5-75.1 20v203.3l58-15.5V202.7l30.8 93.5 41-11L379 175.5v101.7l58-15.5V58.3l-75.1 20z" ] []
        , Svg.path [ SA.fill "#fff", SA.d "M75.1 78.3l34.2 110.8 34.1-92.5 75.2 20v203.3l-58-15.5V202.7l-30.8 93.5-41-11L58 175.5v101.7L0 261.6V58.3l75.1 20z" ] []
        , Svg.path [ SA.d "M293.7 20L218.6 0l-75.1 20 75.1 20 75.1-20zM143.5 96.5l75.1 20 75.1-20-75.1-20-75.1 20zM75.2 38.3L0 58.3l75.1 20 75.2-20-75.2-20zm286.8 0l-75 20 75.1 20 75.1-20-75.1-20z" ] []
        ]
