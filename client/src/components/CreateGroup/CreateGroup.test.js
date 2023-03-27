/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import CreateGroup from "./CreateGroup";

it("Renders the correct component", () => {
  const component = renderer.create(
    <CreateGroup />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
