const Pin = () => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
    <circle cx="29" cy="27" r="25"/>
    </g>
    <g filter="url(#filter1_d)">
    <circle cx="37.5" cy="18.5" r="18.5"/>
    </g>
    <defs>
    <filter id="filter0_d" x="0" y="2" width="54" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow"/>
    <feOffset dx="-2" dy="2"/>
    <feGaussianBlur stdDeviation="0.5"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    <filter id="filter1_d" x="1" y="0" width="55" height="55" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow"/>
    <feOffset dx="-10" dy="10"/>
    <feGaussianBlur stdDeviation="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>
  </svg>
);

export default Pin
