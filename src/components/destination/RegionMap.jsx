import { MAP_REGIONS } from '../../data/mapRegions.js';
export default function RegionMap({ value, onChange }) {
  return <div className="atlas"><div className="atlas-topline"><span>THE TRIPWISE ATLAS</span><span>01 — EXPLORE</span></div>
    <svg viewBox="0 0 800 570" aria-label="Illustrated map. Choose a destination region." role="group">
      <defs><pattern id="grid" width="80" height="65" patternUnits="userSpaceOnUse"><path d="M80 0H0V65" fill="none" stroke="#d4dcd4" strokeWidth="0.65" /></pattern></defs>
      <rect x="25" y="55" width="750" height="455" rx="190" fill="url(#grid)" />
      <g className="map-land" strokeLinejoin="round">
        <path d="M64 173 88 146 136 128 173 145 198 129 244 145 257 172 237 194 227 225 204 246 195 274 219 296 231 316 213 308 185 278 154 267 129 241 105 221 76 207Z" />
        <path d="M248 85 298 71 316 101 289 130 266 133 248 109Z" />
        <path d="M223 323 251 310 282 329 308 346 302 374 283 397 272 431 248 471 236 445 240 413 222 383 211 349Z" />
        <path d="M375 188 389 171 398 152 421 136 437 149 427 177 449 171 464 180 458 199 438 211 452 227 433 235 416 215 401 225 385 213 370 216Z" />
        <path d="M374 245 413 236 452 249 467 275 486 302 466 326 454 359 433 395 413 391 398 360 390 329 368 306 354 274Z" />
        <path d="M453 159 475 135 526 128 563 143 604 131 649 148 691 146 731 169 739 192 709 204 688 225 672 254 652 270 625 268 616 291 629 324 613 347 596 325 582 297 560 287 546 312 526 289 515 261 494 257 477 234 453 219 470 194Z" />
        <path d="M471 263 499 265 518 284 503 302 481 292Z" />
        <path d="M644 292 651 304 647 328 639 317Z M672 253 680 262 675 282 668 274Z M599 355 626 361 642 374 628 378 604 367Z M652 352 665 355 667 372 656 365Z M678 368 704 370 712 381 685 383Z" />
        <path d="M646 400 680 391 711 407 725 435 701 450 682 439 656 447 637 432Z M745 448 754 458 744 478 734 473Z" />
        <path d="M478 363 484 371 478 397 471 391Z M361 163 370 167 368 186 360 184Z" />
      </g>
      <path d="M38 330H762" stroke="#b8c6bc" strokeDasharray="4 7" fill="none" />
      <text x="48" y="347" className="map-ocean">EQUATOR</text><text x="69" y="338" className="map-ocean" transform="translate(0,-45)">PACIFIC OCEAN</text><text x="300" y="355" className="map-ocean">ATLANTIC</text><text x="521" y="399" className="map-ocean">INDIAN OCEAN</text>
      <path d="M608 345Q510 50 400 192" fill="none" stroke="#7a9886" strokeWidth="1.5" strokeDasharray="5 6" />
      {MAP_REGIONS.map(region => <g key={region.name} role="button" tabIndex="0" aria-label={`Select ${region.name}`} aria-pressed={value === region.name} className={`map-region ${value === region.name ? 'selected' : ''}`} onClick={() => onChange(region.name)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onChange(region.name); } }}>
        <title>{region.name}{value === region.name ? ' — selected' : ''}</title>
        <path className="map-leader" d={`M${region.x} ${region.y}L${region.labelX} ${region.labelY}`} />
        <circle className="map-hit" cx={region.x} cy={region.y} r="17" />
        <circle className="map-dot" cx={region.x} cy={region.y} r={value === region.name ? 7 : 4} />
        <text x={region.labelX} y={region.labelY - 8} textAnchor="middle">{value === region.name ? '✓ ' : ''}{region.name}</text>
      </g>)}
      <g transform="translate(73,442)" className="compass"><path d="M0-27 6-6 27 0 6 6 0 27-6 6-27 0-6-6Z" /><path d="M0-27V27M-27 0H27" /><text y="-37" textAnchor="middle">N</text></g>
      <circle cx="608" cy="345" r="3" fill="#154e47" /><text x="618" y="357" className="map-origin">KLIA</text>
    </svg>
    <div className="atlas-bottomline"><span><i /> {value ? `Selected: ${value}` : 'Choose where your story begins'}</span><span>ILLUSTRATED REGIONAL GUIDE</span></div>
  </div>;
}
