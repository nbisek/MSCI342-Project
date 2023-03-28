/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import FindGroups from "./index";

it("Renders the correct component", () => {
  const component = renderer.create(
    <FindGroups />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
