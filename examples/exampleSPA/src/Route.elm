module Route exposing (Route(..), Slug(..), maybeRoute, routeToString)

import Navigation
import UrlParser exposing ((</>))


-- ROUTING --


type Route
    = RouteHome
    | RouteWidgetExampleEmailStep1
    | RouteWidgetExampleEmailStep2
    | RouteWidgetExample4DigitCodeStep1
    | RouteWidgetExample4DigitCodeStep2
    | RouteFramework
    | RouteFramework2 Slug Slug


path :
    { emailOk : String
    , example : String
    , framework : String
    , withEmail : String
    , withPhone : String
    , codeOk : String
    }
path =
    { example = "example"
    , withEmail = "with-email"
    , withPhone = "with-phone"
    , emailOk = "ok"
    , codeOk = "ok"
    , framework = "framework"
    }


route : UrlParser.Parser (Route -> a) a
route =
    UrlParser.oneOf
        [ UrlParser.map RouteHome (UrlParser.s "")
        , UrlParser.map RouteFramework (UrlParser.s path.framework)
        , UrlParser.map RouteFramework2 (UrlParser.s path.framework </> stateParser </> stateParser)
        , UrlParser.map RouteWidgetExampleEmailStep1 (UrlParser.s path.example </> UrlParser.s path.withEmail)
        , UrlParser.map RouteWidgetExampleEmailStep2 (UrlParser.s path.example </> UrlParser.s path.withEmail </> UrlParser.s path.emailOk)
        , UrlParser.map RouteWidgetExample4DigitCodeStep1 (UrlParser.s path.example </> UrlParser.s path.withPhone)
        , UrlParser.map RouteWidgetExample4DigitCodeStep2 (UrlParser.s path.example </> UrlParser.s path.withPhone </> UrlParser.s path.codeOk)
        ]



-- Slug


type Slug
    = Slug String


slugToString : Slug -> String
slugToString (Slug slug) =
    slug


stateParser : UrlParser.Parser (Slug -> a) a
stateParser =
    UrlParser.custom "SLUG" (Ok << Slug)



-- INTERNAL --


routeRoot : String
routeRoot =
    "#/"


routeToString : Route -> String
routeToString page =
    let
        pieces =
            case page of
                RouteHome ->
                    []

                RouteWidgetExampleEmailStep1 ->
                    [ path.example, path.withEmail ]

                RouteWidgetExampleEmailStep2 ->
                    [ path.example, path.withEmail, path.emailOk ]

                RouteWidgetExample4DigitCodeStep1 ->
                    [ path.example, path.withPhone ]

                RouteWidgetExample4DigitCodeStep2 ->
                    [ path.example, path.withPhone, path.codeOk ]

                RouteFramework ->
                    [ path.framework ]

                RouteFramework2 slug1 slug2 ->
                    [ path.framework, slugToString slug1, slugToString slug2 ]
    in
    routeRoot ++ String.join "/" pieces



-- PUBLIC HELPERS --


maybeRoute : Navigation.Location -> Maybe Route
maybeRoute location =
    if String.isEmpty location.hash then
        Just RouteHome
    else
        UrlParser.parseHash route location
