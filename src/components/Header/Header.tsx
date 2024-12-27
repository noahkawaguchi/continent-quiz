import React from "react";

/**
 * A component showing the "Continent Quiz" title and the tag line.
 * @returns A header and a paragraph.
 */
const Header: React.FC = (): React.JSX.Element => {
  return (
    <>
      <h1>Continent Quiz</h1>
      <p><i>
        Test your geography knowledge by selecting the 
        correct continent for each country or region.
      </i></p>
    </>
  );
};

export default Header;
