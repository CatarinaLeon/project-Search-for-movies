import { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Section from "../../common/Section/Section";
import Container from "../../common/Container/Container";

const HomePage = lazy(() =>
  import("../../page/HomePage/HomePage" /* webpackChunkName:  "Home__Page" */)
);
const MoviesPage = lazy(() =>
  import(
    "../../page/MoviesPage/MoviesPage" /* webpackChunkName:  "Movies__Page" */
  )
);
const MoviesDetailsPage = lazy(() =>
  import(
    "../../page/MoviesDetailsPage/MoviesDetailsPage" /* webpackChunkName:  "Movies__Details" */
  )
);

export default function Main({ lang }) {
  return (
    <main>
      <Section>
        <Container>
          <Switch>
            <Route exact path="/">
              <HomePage lang={lang} />
            </Route>
            <Route exact path="/movies">
              <MoviesPage lang={lang} />
            </Route>
            <Route path="/movies/:id">
              <MoviesDetailsPage lang={lang} />
            </Route>
          </Switch>
        </Container>
      </Section>
    </main>
  );
}
