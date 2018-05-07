module ExampleCustomized exposing (initConf, main)

import Element exposing (alpha, column, el, link, moveLeft, none, paragraph, text)
import Element.Font as Font
import Framework
import FrameworkCustomized.Logo as Logo
import Navigation


main : Program Framework.Flag Framework.Model Framework.Msg
main =
    Navigation.programWithFlags Framework.MsgChangeLocation
        { init = init
        , view = Framework.view
        , update = Framework.update
        , subscriptions = Framework.subscriptions
        }


init : Framework.Flag -> Navigation.Location -> ( Framework.Model, Cmd msg )
init flag location =
    let
        initModel =
            Framework.initModel flag location
    in
    ( { initModel
        | conf = initConf
        , introspections = introspections
      }
    , Framework.initCmd
    )


introspections : List ( Framework.Introspection, Bool )
introspections =
    ( Logo.introspection, True ) :: Framework.introspections


initConf : Framework.Conf msg
initConf =
    let
        confData =
            Framework.initConf
    in
    { confData
        | title =
            column
                [ Font.family
                    [ Font.external
                        { name = "Archivo Black"
                        , url = "https://fonts.googleapis.com/css?family=Archivo+Black"
                        }
                    , Font.typeface "Archivo Black"
                    ]
                , Font.size 40
                ]
                [ link [ alpha 0.7 ] { label = Logo.logo Logo.LogoMassiveDynamics 120, url = ".." }
                , el [ moveLeft 3 ] <| text "Massive"
                , el [ moveLeft 3 ] <| text "Dynamics"
                ]
        , subTitle = "STYLE FRAMEWORK"
        , version = "0.0.2"
        , introduction =
            paragraph []
                [ text "This is a cutomized version of "
                , el [ Font.bold ] <| text "elm-style-elements"
                , text "."
                ]
        , mainPadding = 41
        , password = ""
        , forkMe = Element.inFront <| none
        , hostnamesWithoutPassword = \_ -> True
    }
