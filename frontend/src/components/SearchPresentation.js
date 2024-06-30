import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchPresentation() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search_term");

  return (
    <div>
      <p style={{ color: "#4b4a4a" }}>
        Kết quả tìm kiếm với từ khóa <b>'{searchTerm}'</b>
      </p>
    </div>
  );
}
