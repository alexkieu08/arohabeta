const skinColors = [
    { name: 'Default White', value: '#ffffff' },
    { name: 'Warm Peach', value: '#ffd8be' },
    { name: 'Soft Blush', value: '#ffcad4' },
    { name: 'Sleek Cocoa', value: '#ddb892' },
    { name: 'Deep Espresso', value: '#7f5539' },
    { name: 'Lilac Dream', value: '#e8e5ff' },
    { name: 'Mint Refresh', value: '#d8f3dc' },
    { name: 'Sky Blue', value: '#e0f2fe' }
];

const bodyTypes = [
    {
        id: 'standard',
        name: 'Standard',
        paths: {
            body: 'M 70 140 Q 100 130 130 140 L 130 200 Q 100 210 70 200 Z',
            lArm: 'M 75 145 Q 40 155 25 175 Q 40 190 75 165',
            rArm: 'M 125 145 Q 160 115 175 125 Q 160 155 125 165',
            lLeg: 'M 70 200 L 60 240 Q 70 250 80 240 L 90 200',
            rLeg: 'M 130 200 L 140 240 Q 130 250 120 240 L 110 200'
        },
        headTranslate: 'translate(0, 0)',
        svg: '<ellipse cx="30" cy="30" rx="20" ry="18" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>'
    },
    {
        id: 'chubby',
        name: 'Chubby',
        paths: {
            body: 'M 60 150 Q 100 140 140 150 L 140 200 Q 100 215 60 200 Z',
            lArm: 'M 65 155 Q 30 165 15 185 Q 30 200 65 175',
            rArm: 'M 135 155 Q 170 125 185 135 Q 170 165 135 175',
            lLeg: 'M 70 200 L 60 240 Q 70 250 80 240 L 90 200',
            rLeg: 'M 130 200 L 140 240 Q 130 250 120 240 L 110 200'
        },
        headTranslate: 'translate(0, 10)',
        svg: '<ellipse cx="30" cy="30" rx="24" ry="14" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>'
    },
    {
        id: 'tall',
        name: 'Tall',
        paths: {
            body: 'M 75 120 Q 100 110 125 120 L 125 200 Q 100 210 75 200 Z',
            lArm: 'M 80 125 Q 45 135 30 155 Q 45 170 80 145',
            rArm: 'M 120 125 Q 155 95 170 105 Q 155 135 120 145',
            lLeg: 'M 75 200 L 65 240 Q 75 250 85 240 L 95 200',
            rLeg: 'M 125 200 L 135 240 Q 125 250 115 240 L 105 200'
        },
        headTranslate: 'translate(0, -20)',
        svg: '<ellipse cx="30" cy="30" rx="16" ry="24" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>'
    },
    {
        id: 'tiny',
        name: 'Tiny',
        paths: {
            body: 'M 80 160 Q 100 155 120 160 L 120 200 Q 100 205 80 200 Z',
            lArm: 'M 85 165 Q 60 170 50 185 Q 60 195 85 180',
            rArm: 'M 115 165 Q 140 145 150 155 Q 140 175 115 170',
            lLeg: 'M 80 200 L 75 230 Q 80 240 85 230 L 90 200',
            rLeg: 'M 120 200 L 125 230 Q 120 240 115 230 L 110 200'
        },
        headTranslate: 'translate(0, 20)',
        svg: '<ellipse cx="30" cy="30" rx="14" ry="12" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>'
    }
];

const hairOptions = {
    bald: {
        name: 'Bald',
        svg: ''
    },
    fluffy: {
        name: 'Fluffy Bob',
        svg: `<path d="M 40 75 Q 38 25 100 25 Q 162 25 160 75 Q 142 62 125 65 Q 100 52 80 62 Q 58 60 40 75 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`
    },
    pigtails: {
        name: 'Pigtails',
        svg: `<g fill="#94a3b8" stroke="#334155" stroke-width="2">
                 <circle cx="33" cy="65" r="16"/>
                 <circle cx="167" cy="65" r="16"/>
                 <circle cx="38" cy="60" r="4" fill="#f43f5e" data-accessory="true"/>
                 <circle cx="162" cy="60" r="4" fill="#f43f5e" data-accessory="true"/>
                 <path d="M 40 75 Q 38 25 100 25 Q 162 25 160 75 Q 142 62 125 65 Q 100 52 80 62 Q 58 60 40 75 Z"/>
               </g>`
    },
    spiky: {
        name: 'Messy Spiky',
        svg: `<path d="M 40 75 Q 35 25 60 30 Q 75 15 95 28 Q 115 12 135 30 Q 155 18 160 75 Q 140 60 120 62 Q 100 48 80 62 Q 60 60 40 75 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`
    },
    bun: {
        name: 'Space Buns',
        svg: `<g fill="#94a3b8" stroke="#334155" stroke-width="2">
                 <circle cx="50" cy="28" r="16"/>
                 <circle cx="150" cy="28" r="16"/>
                 <path d="M 40 75 Q 38 25 100 25 Q 162 25 160 75 Q 142 62 125 65 Q 100 52 80 62 Q 58 60 40 75 Z"/>
               </g>`
    },
    afro: {
        name: 'Curly Afro',
        svg: `<path d="M 45 75 Q 24 55 30 38 Q 40 12 70 18 Q 100 6 130 18 Q 160 12 170 38 Q 176 55 155 75 Q 140 68 130 70 Q 100 60 70 70 Q 60 68 45 75 Z" fill="#94a3b8" stroke="#334155" stroke-width="2"/>`
    }
};

const hairColors = [
    { name: 'Sleek Grey', value: '#94a3b8' },
    { name: 'Dark Slate', value: '#1e293b' },
    { name: 'Pastel Blonde', value: '#fef08a' },
    { name: 'Ginger Auburn', value: '#d97706' },
    { name: 'Soft Brown', value: '#854d0e' },
    { name: 'Pastel Pink', value: '#f472b6' },
    { name: 'Lavender Violet', value: '#c084fc' },
    { name: 'Pastel Mint', value: '#a7f3d0' },
    { name: 'Sky Blue', value: '#60a5fa' },
    { name: 'Winter White', value: '#f8fafc' }
];

const eyesOptions = {
    curved: {
        name: 'Happy Arc',
        svg: `<path d="M 70 85 Q 75 75 85 85" fill="none" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>
              <path d="M 115 85 Q 125 75 130 85" fill="none" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>`
    },
    open: {
        name: 'Excited',
        svg: `<circle cx="78" cy="80" r="7.5" fill="#6b7280"/>
              <circle cx="122" cy="80" r="7.5" fill="#6b7280"/>`
    },
    sleepy: {
        name: 'Sleepy',
        svg: `<line x1="70" y1="80" x2="85" y2="80" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>
              <line x1="115" y1="80" x2="130" y2="80" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>`
    },
    wink: {
        name: 'Wink',
        svg: `<circle cx="78" cy="80" r="7.5" fill="#6b7280"/>
              <path d="M 115 80 Q 122 87 130 80" fill="none" stroke="#6b7280" stroke-width="5" stroke-linecap="round"/>`
    },
    heart: {
        name: 'Lovestruck',
        svg: `<g fill="#f43f5e" stroke="#f43f5e" stroke-width="1">
                <path d="M 77 71 C 74 65, 66 68, 69 76 L 77 84 L 85 76 C 88 68, 80 65, 77 71 Z" />
                <path d="M 121 71 C 118 65, 110 68, 113 76 L 121 84 L 129 76 C 132 68, 124 65, 121 71 Z" />
              </g>`
    }
};

const smileOptions = {
    standard: {
        name: 'Happy',
        svg: `<path d="M 90 110 Q 100 115 110 110" fill="none" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>`
    },
    laughing: {
        name: 'Laughing',
        svg: `<path d="M 90 106 Q 100 122 110 106 Z" fill="#6b7280"/>`
    },
    flat: {
        name: 'Neutral',
        svg: `<line x1="90" y1="110" x2="110" y2="110" stroke="#6b7280" stroke-width="4" stroke-linecap="round"/>`
    },
    surprise: {
        name: 'Surprised',
        svg: `<circle cx="100" cy="110" r="6" fill="none" stroke="#6b7280" stroke-width="4"/>`
    },
    cat: {
        name: 'Cute Cat',
        svg: `<path d="M 90 108 Q 95 113 100 108 Q 105 113 110 108" fill="none" stroke="#6b7280" stroke-width="3" stroke-linecap="round"/>`
    }
};

const clothesOptions = {
    'style 1': [
        { category: 'Basics', options: [
            { id: 'none', name: 'None', body: '', lArm: '', rArm: '' },
            {
                id: 'tshirt',
                name: 'Basic Tee',
                body: '<path d="M 70 140 Q 100 130 130 140 L 130 185 Q 100 195 70 185 Z"/><path d="M 85 140 Q 100 150 115 140" fill="none" stroke="#334155" stroke-width="1.5" opacity="0.3" data-decorative="true"/>',
                lArm: '<path d="M 75 145 Q 48 153 40 162 Q 50 172 75 165"/>',
                rArm: '<path d="M 125 145 Q 152 123 160 132 Q 150 142 125 165"/>'
            },
            {
                id: 'tanktop',
                name: 'Tank Top',
                body: '<path d="M 80 140 Q 100 135 120 140 L 120 195 Q 100 205 80 195 Z"/><path d="M 80 140 Q 100 150 120 140" fill="none" stroke="#334155" stroke-width="2" opacity="0.2" data-decorative="true"/>',
                lArm: '',
                rArm: ''
            },
            {
                id: 'croptop',
                name: 'Crop Top',
                body: '<path d="M 70 140 Q 100 130 130 140 L 130 170 Q 100 175 70 170 Z"/>',
                lArm: '<path d="M 75 145 Q 60 150 55 155 Q 60 165 75 160"/>',
                rArm: '<path d="M 125 145 Q 140 130 145 135 Q 140 145 125 150"/>'
            }
        ]},
        { category: 'Cultural', options: [
            {
                id: 'pacifica',
                name: 'Bula Shirt',
                body: `<path d="M 68 140 Q 100 125 132 140 L 132 195 Q 100 205 68 195 Z"/>
                       <path d="M 68 140 L 85 155 L 100 145 L 115 155 L 132 140" fill="none" stroke="#334155" stroke-width="1.5" opacity="0.4" data-decorative="true"/>
                       <circle cx="85" cy="170" r="3" fill="white" opacity="0.5" data-decorative="true"/>
                       <circle cx="115" cy="170" r="3" fill="white" opacity="0.5" data-decorative="true"/>
                       <circle cx="100" cy="185" r="3" fill="white" opacity="0.5" data-decorative="true"/>`,
                lArm: '<path d="M 75 145 Q 50 150 45 165 Q 55 175 75 168"/>',
                rArm: '<path d="M 125 145 Q 150 120 155 135 Q 145 145 125 152"/>'
            }
        ]}
    ],
    'style 2': [
        { category: 'Outdoor', options: [
            {
                id: 'hoodie',
                name: 'Comfy Hoodie',
                body: '<path d="M 65 140 Q 100 125 135 140 L 135 205 Q 100 215 65 205 Z"/><path d="M 85 140 Q 100 155 115 140" fill="none" stroke="#334155" stroke-width="2" opacity="0.3" data-decorative="true"/><path d="M 80 185 L 120 185 L 115 200 L 85 200 Z" fill="none" stroke="#334155" stroke-width="1" opacity="0.2" data-decorative="true"/>',
                lArm: '<path d="M 75 145 Q 40 155 25 175 Q 40 190 75 165"/>',
                rArm: '<path d="M 125 145 Q 160 115 175 125 Q 160 155 125 165"/>'
            }
        ]},
        { category: 'Modern', options: [
            {
                id: 'vneck',
                name: 'V-Neck',
                body: '<path d="M 70 140 L 90 140 L 100 155 L 110 140 L 130 140 L 130 185 Q 100 195 70 185 Z"/><path d="M 100 155 L 100 185" fill="none" stroke="#334155" stroke-width="1" opacity="0.1" data-decorative="true"/>',
                lArm: '<path d="M 75 145 Q 55 150 50 155 Q 55 165 75 160"/>',
                rArm: '<path d="M 125 145 Q 145 130 150 135 Q 145 145 125 150"/>'
            },
            {
                id: 'maori',
                name: 'Koru Tee',
                body: `<path d="M 70 140 Q 100 130 130 140 L 130 185 Q 100 195 70 185 Z"/>
                       <path d="M 100 165 Q 110 165 110 175 Q 110 185 100 185 Q 90 185 90 175 Q 90 170 95 170" fill="none" stroke="white" stroke-width="2" opacity="0.4" data-decorative="true"/>
                       <path d="M 85 140 Q 100 150 115 140" fill="none" stroke="#334155" stroke-width="1.5" opacity="0.3" data-decorative="true"/>`,
                lArm: '<path d="M 75 145 Q 48 153 40 162 Q 50 172 75 165"/>',
                rArm: '<path d="M 125 145 Q 152 123 160 132 Q 150 142 125 165"/>'
            },
            {
                id: 'turtleneck',
                name: 'Turtleneck',
                body: '<path d="M 70 140 L 130 140 L 130 200 Q 100 210 70 200 Z"/><path d="M 85 125 L 115 125 L 115 140 L 85 140 Z" data-decorative="true"/>',
                lArm: '<path d="M 75 145 Q 40 155 25 175 Q 40 190 75 165"/>',
                rArm: '<path d="M 125 145 Q 160 115 175 125 Q 160 155 125 165"/>'
            }
        ]
    }
]};

const clothesColors = [
    { name: 'Sleek Grey', value: '#94a3b8' },
    { name: 'Dark Slate', value: '#1e293b' },
    { name: 'Navy Blue', value: '#1e3a8a' },
    { name: 'Forest Green', value: '#14532d' },
    { name: 'Wine Red', value: '#7f1d1d' },
    { name: 'Pastel Blonde', value: '#fef08a' },
    { name: 'Ginger Auburn', value: '#d97706' },
    { name: 'Soft Brown', value: '#854d0e' },
    { name: 'Pastel Pink', value: '#f472b6' },
    { name: 'Lavender Violet', value: '#c084fc' },
    { name: 'Pastel Mint', value: '#a7f3d0' },
    { name: 'Sky Blue', value: '#60a5fa' },
    { name: 'Winter White', value: '#f8fafc' }
];
