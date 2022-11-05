import React from "react";
import { render } from "@testing-library/react";
import ButtonSet from "./ButtonSet";
import Button from "../Button";

describe("Button Set", () => {
  test("Renders Button components", () => {
    render(
      <ButtonSet>
        <Button id="b1">Button One</Button>
        <Button id="b2">Button Two</Button>
        <Button id="b3">Button Three</Button>
      </ButtonSet>
    );
  });
});