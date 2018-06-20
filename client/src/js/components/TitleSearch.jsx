import React from 'react';
import '../../css/titleSearch.css';
import { airbnbLogoSvg, chevronDownSVG, searchIconSvg } from '../clientHelpers';

const TitleSearch = () => (
  <div className="title-search">
    <div className="title-icons">
      <div className="airbnb-icon">
        {airbnbLogoSvg}
      </div>
      <div className="title-search-menu-icon">
        {chevronDownSVG}
      </div>
    </div>
    <div className="title-search-bar">
      <button className="title-search-bar-inner">
        <span className="title-search-search-icon">
          {searchIconSvg}
        </span>
        <div className="title-search-input">
          <input
            type="text"
            placeholder="Anywhere"
          />
        </div>
      </button>
    </div>
  </div>
);

export default TitleSearch;
