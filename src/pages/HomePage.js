import React from "react";
import { routes } from "../routes";

export default function HomePage() {
  return (
    <div>
      <a href={routes.login}>Dang nhap</a>
      <a href={routes.register}>Dang ki</a>
    </div>
  );
}
