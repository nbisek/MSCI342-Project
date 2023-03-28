/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import ForgotPassword from "./index";

it("Renders the correct component", () => {
  const component = renderer.create(
    <ForgotPassword />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
