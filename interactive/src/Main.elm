port module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import DataTypes exposing (..)
import Html exposing (Html, div, h1, img, p, section, text)
import Html.Attributes exposing (attribute, class, id, src, classList)
import Http
import Json.Encode as E
import Markdown exposing (toHtml)



---- MODEL ----


type alias Model =
    { article : List ScrollySection
    , activeLabel : Maybe String
    , activeStep : Int
    }


type alias Config =
    { article : List ScrollySection }


init : Config -> ( Model, Cmd Msg )
init { article } =
    ( Model article Nothing -1, Cmd.none )



---- UPDATE ----


type Msg
    = DataLoad (Result Http.Error Int)
    | Scroll ( String, Int )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        DataLoad (Err e) ->
            ( model, Cmd.none )

        DataLoad (Ok f) ->
            ( model, Cmd.none )

        Scroll ( si, i ) ->
            ( { model | activeStep = i, activeLabel = Just si }, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    let
        step i scrolly =
            toHtml
                [ class "step"
                , classList [("is-active", i == model.activeStep)]
                , attribute "data-label" scrolly.label
                , attribute "data-step" <| String.fromInt i
                ]
                scrolly.text
    in
    section [ id "scroll" ]
        [ div [ class "scroll__graphic sticky" ]
            [ div [ class "chart" ]
                [ p [] [ Maybe.withDefault "hi" model.activeLabel |> text ]
                ]
            ]
        , div [ class "scroll__text" ]
            (List.indexedMap step model.article)
        ]



---- PROGRAM ----


main : Program Config Model Msg
main =
    Browser.element
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch [ scroll Scroll ]


port scroll : (( String, Int ) -> msg) -> Sub msg
