module Route exposing
    ( Route(..)
    , Slug(..)
    , fromStringToUrl
    , fromUrl
    , toString
    , toStringAndHash
    )

--import Navigation

import Url
import Url.Parser exposing ((</>))



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


parser : Url.Parser.Parser (Route -> a) a
parser =
    Url.Parser.oneOf
        [ Url.Parser.map RouteFramework2 (Url.Parser.s path.framework </> stateParser </> stateParser)
        , Url.Parser.map RouteFramework (Url.Parser.s path.framework)
        , Url.Parser.map RouteWidgetExampleEmailStep2 (Url.Parser.s path.example </> Url.Parser.s path.withEmail </> Url.Parser.s path.emailOk)
        , Url.Parser.map RouteWidgetExampleEmailStep1 (Url.Parser.s path.example </> Url.Parser.s path.withEmail)
        , Url.Parser.map RouteWidgetExample4DigitCodeStep2 (Url.Parser.s path.example </> Url.Parser.s path.withPhone </> Url.Parser.s path.codeOk)
        , Url.Parser.map RouteWidgetExample4DigitCodeStep1 (Url.Parser.s path.example </> Url.Parser.s path.withPhone)
        , Url.Parser.map RouteHome (Url.Parser.s "")
        ]



-- Slug


type Slug
    = Slug String


slugToString : Slug -> String
slugToString (Slug slug) =
    slug


stateParser : Url.Parser.Parser (Slug -> a) a
stateParser =
    Url.Parser.custom "SLUG" (Just << Slug)


toString : Route -> String
toString page =
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
    "/" ++ String.join "/" pieces


toStringAndHash route =
    "#" ++ toString route


fromUrl url =
    Maybe.withDefault RouteHome <| urlToMaybeRoute url


urlToMaybeRoute url =
    -- We copy the fragment in to the path first because the parser only works
    -- on the path
    Url.Parser.parse parser { url | path = Maybe.withDefault "" url.fragment }


fromStringToUrl locationHref =
    Maybe.withDefault
        { protocol = Url.Https
        , host = ""
        , port_ = Nothing
        , path = ""
        , query = Nothing
        , fragment = Nothing
        }
    <|
        Url.fromString locationHref



{-
   maybeRoute : Url.Url -> Maybe Route
   maybeRoute url =
       if String.isEmpty location.hash then
           Just RouteHome

       else
           Url.Parser.parseHash route location
-}
