import { all } from "redux-saga/effects";
import LessonSagas from './lesson';

export default function* rootSaga () {
    yield all([
        LessonSagas(),
    ]);
}