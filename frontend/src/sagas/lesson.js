import { all, put, takeEvery } from "redux-saga/effects";

function* getLesson() {
  try {
    const context = require.context('./json', true, /.json$/);
    const all = [];
    context.keys().forEach((key) => {
      const fileName = key.replace('./', '');
      const resource = require(`./json/${fileName}`);
      all.push(JSON.parse(JSON.stringify(resource)));
    });
    console.log(all.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })))
    let response = all.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }))
    let t = new Set(all.reduce((total, cur) => total + cur.topic, "")
      .replace(/(\n<\/ul>|<ul class="tags">\n|\shref=".*")/g, "")
      .replace(/<\/a><a/g, "</a>\n<a").replace(/<a class="tag">(.*)<\/a>/g, "$1").split("\n"))
    yield put({
      type: "lesson/saveState",
      payload: {
        data: response,
        topic: Array.from(t),
      },
    });
  } catch (err) {
    console.log(err.message);
  }
}

export default function* watchAll() {
  yield all([
    yield takeEvery("lesson/getLesson", getLesson)
  ])
}