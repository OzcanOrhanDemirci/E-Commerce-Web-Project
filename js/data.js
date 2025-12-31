/* Project: PC Craft
   File: js/data.js
   Description: Product database containing specs, pricing, and user reviews.
*/

const products = [
    // --- 1. CPUs ---
    {
        id: 101,
        name: "Intel Core i3-12100F",
        category: "cpu",
        price: 99,
        image: "assets/products/cpu-i3.jpg",
        specs: { brand: "Intel", series: "Core i3", socket: "LGA1700", cores: 4, generation: "12th Gen" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "BudgetKing", rating: 5, text: "Best budget CPU right now. Handles games surprisingly well." },
            { user: "OfficeWorker", rating: 4, text: "Great for daily tasks, runs very cool with stock cooler." }
        ]
    },
    {
        id: 102,
        name: "AMD Ryzen 5 5600",
        category: "cpu",
        price: 149,
        image: "assets/products/cpu-r5.jpg",
        specs: { brand: "AMD", series: "Ryzen 5", socket: "AM4", cores: 6, generation: "Zen 3" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "Gamer123", rating: 5, text: "Value king. Paired with a 3060 and it runs everything." },
            { user: "TechEnthusiast", rating: 5, text: "Unbeatable price to performance ratio." },
            { user: "UnluckyGuy", rating: 2, text: "Arrived with bent pins, had to return it." }
        ]
    },
    {
        id: 103,
        name: "Intel Core i5-13600K",
        category: "cpu",
        price: 319,
        image: "assets/products/cpu-i5.jpg",
        specs: { brand: "Intel", series: "Core i5", socket: "LGA1700", cores: 14, generation: "13th Gen" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "ProEditor", rating: 5, text: "Render times are cut in half compared to my old i7." },
            { user: "ThermalWatcher", rating: 4, text: "Fast but runs a bit hot, you need a good AIO." }
        ]
    },
    {
        id: 104,
        name: "AMD Ryzen 7 7800X3D",
        category: "cpu",
        price: 399,
        image: "assets/products/cpu-r7.jpg",
        specs: { brand: "AMD", series: "Ryzen 7", socket: "AM5", cores: 8, generation: "Zen 4" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "FPS_Hunter", rating: 5, text: "The best gaming CPU hands down. The cache makes a huge difference." },
            { user: "EfficiencyLover", rating: 5, text: "Incredibly efficient, consumes very little power while gaming." }
        ]
    },
    {
        id: 105,
        name: "Intel Core i9-14900KS",
        category: "cpu",
        price: 699,
        image: "assets/products/cpu-i9.jpg",
        specs: { brand: "Intel", series: "Core i9", socket: "LGA1700", cores: 24, generation: "14th Gen" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "PowerUser", rating: 5, text: "Absolute monster. Chews through any workload." },
            { user: "BillPayer", rating: 3, text: "Performance is top tier but power consumption is insane." },
            { user: "Overclocker", rating: 5, text: "Reached 6.2GHz easily." }
        ]
    },

    // --- 2. Motherboards ---
    {
        id: 201,
        name: "Gigabyte H610M H",
        category: "motherboard",
        price: 89,
        image: "assets/products/mb-h610.jpg",
        specs: { brand: "Gigabyte", socket: "LGA1700", ramType: "DDR4", formFactor: "mATX" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "StarterBuilder", rating: 4, text: "Good entry level board. BIOS is simple." },
            { user: "AdvUser", rating: 3, text: "Lacks VRM cooling, not good for high-end CPUs." }
        ]
    },
    {
        id: 202,
        name: "MSI B550-A PRO",
        category: "motherboard",
        price: 139,
        image: "assets/products/mb-b550.jpg",
        specs: { brand: "MSI", socket: "AM4", ramType: "DDR4", formFactor: "ATX" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "SolidChoice", rating: 5, text: "Rock solid stability. Best B550 board for the price." },
            { user: "Dave", rating: 5, text: "Plenty of fan headers and USB ports." }
        ]
    },
    {
        id: 203,
        name: "ASUS TUF B650-PLUS",
        category: "motherboard",
        price: 229,
        image: "assets/products/mb-b650.jpg",
        specs: { brand: "ASUS", socket: "AM5", ramType: "DDR5", formFactor: "ATX" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "TufFan", rating: 5, text: "Military grade components as always. Very durable." },
            { user: "EarlyAdopter", rating: 4, text: "Boot times are a bit long but that's AM5 for you." }
        ]
    },
    {
        id: 204,
        name: "MSI MPG Z790 Edge",
        category: "motherboard",
        price: 359,
        image: "assets/products/mb-z790.jpg",
        specs: { brand: "MSI", socket: "LGA1700", ramType: "DDR5", formFactor: "ATX" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "WhiteBuild", rating: 5, text: "Looks stunning in my all-white build." },
            { user: "OC_Master", rating: 5, text: "Great overclocking potential on memory." }
        ]
    },
    {
        id: 205,
        name: "ASUS ROG X670E Hero",
        category: "motherboard",
        price: 649,
        image: "assets/products/mb-x670e.jpg",
        specs: { brand: "ASUS", socket: "AM5", ramType: "DDR5", formFactor: "E-ATX" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "Enthusiast_99", rating: 5, text: "The feature set is endless. Future proof." },
            { user: "WalletPain", rating: 4, text: "Amazing board but very expensive." }
        ]
    },

    // --- 3. GPUs ---
    {
        id: 301,
        name: "NVIDIA GeForce GTX 1650",
        category: "gpu",
        price: 169,
        image: "assets/products/gpu-1650.jpg",
        specs: { chipset: "NVIDIA", series: "GTX Series", vram: "4GB" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "CasualGamer", rating: 4, text: "Still runs esports titles fine at 1080p." },
            { user: "OldGen", rating: 2, text: "Struggles with modern AAA games." }
        ]
    },
    {
        id: 302,
        name: "AMD Radeon RX 7600",
        category: "gpu",
        price: 269,
        image: "assets/products/gpu-rx7600.jpg",
        specs: { chipset: "AMD", series: "RX 7000 Series", vram: "8GB" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "RedTeam", rating: 5, text: "Excellent 1080p performance for the price." },
            { user: "DriverUpdate", rating: 4, text: "Drivers are stable now, no issues." }
        ]
    },
    {
        id: 303,
        name: "NVIDIA GeForce RTX 4060 Ti",
        category: "gpu",
        price: 399,
        image: "assets/products/gpu-4060ti.jpg",
        specs: { chipset: "NVIDIA", series: "RTX 40 Series", vram: "16GB" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "DLSS_User", rating: 5, text: "DLSS 3.0 Frame Gen is magic. Doubles my FPS." },
            { user: "BandwidthCheck", rating: 3, text: "16GB is nice but memory bus is narrow." }
        ]
    },
    {
        id: 304,
        name: "NVIDIA GeForce RTX 4080 Super",
        category: "gpu",
        price: 999,
        image: "assets/products/gpu-4080s.jpg",
        specs: { chipset: "NVIDIA", series: "RTX 40 Series", vram: "16GB" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "4K_Gamer", rating: 5, text: "Crushes everything at 4K. Ray Tracing looks beautiful." },
            { user: "StreamerX", rating: 5, text: "NVENC encoder is perfect for streaming." },
            { user: "BigCard", rating: 4, text: "Check your case size, this thing is massive." }
        ]
    },
    {
        id: 305,
        name: "NVIDIA GeForce RTX 5090",
        category: "gpu",
        price: 1999,
        image: "assets/products/gpu-5090.jpg",
        specs: { chipset: "NVIDIA", series: "RTX 50 Series", vram: "32GB" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "DreamBuild", rating: 5, text: "Performance from the future. Nothing comes close." },
            { user: "AI_Dev", rating: 5, text: "Bought for AI training, the VRAM is a lifesaver." },
            { user: "RichKid", rating: 5, text: "The best money can buy." }
        ]
    },

    // --- 4. RAM ---
    {
        id: 401,
        name: "G.Skill Ripjaws V 8GB",
        category: "ram",
        price: 29,
        image: "assets/products/ram-8gb.jpg",
        specs: { type: "DDR4", capacity: "8GB", speed: "3200MHz" },
        campaign: { installment: 1, bank: "None" },
        reviews: [
            { user: "BasicUser", rating: 4, text: "Does the job for basic tasks." },
            { user: "Upgrader", rating: 5, text: "Added to my existing stick, works perfectly." }
        ]
    },
    {
        id: 402,
        name: "Corsair Vengeance LPX 16GB",
        category: "ram",
        price: 59,
        image: "assets/products/ram-16gb.jpg",
        specs: { type: "DDR4", capacity: "16GB", speed: "3600MHz" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "SystemBuilder", rating: 5, text: "Enabled XMP and got 3600MHz instantly. Stable." },
            { user: "LowProfile", rating: 5, text: "Fits under big air coolers easily." }
        ]
    },
    {
        id: 403,
        name: "Kingston Fury Beast 32GB",
        category: "ram",
        price: 119,
        image: "assets/products/ram-32gb.jpg",
        specs: { type: "DDR5", capacity: "32GB", speed: "5200MHz" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "DDR5_Adopter", rating: 4, text: "Good entry level DDR5 kit." },
            { user: "Speedy", rating: 5, text: "Noticeably faster than my old DDR4." }
        ]
    },
    {
        id: 404,
        name: "G.Skill Trident Z5 32GB",
        category: "ram",
        price: 159,
        image: "assets/products/ram-z5.jpg",
        specs: { type: "DDR5", capacity: "32GB", speed: "6000MHz" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "RGB_Fan", rating: 5, text: "The RGB looks fantastic and syncs well." },
            { user: "PerfSeeker", rating: 5, text: "Runs at 6000MHz CL30 without issues." }
        ]
    },
    {
        id: 405,
        name: "Corsair Dominator 64GB",
        category: "ram",
        price: 329,
        image: "assets/products/ram-dom.jpg",
        specs: { type: "DDR5", capacity: "64GB", speed: "7200MHz" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "VideoEditor", rating: 5, text: "Finally enough RAM for 8K video editing." },
            { user: "PremiumBuild", rating: 5, text: "Build quality is top notch, heavy heatsinks." }
        ]
    },

    // --- 5. Storage ---
    {
        id: 501,
        name: "Crucial BX500 500GB",
        category: "storage",
        price: 39,
        image: "assets/products/ssd-sata.jpg",
        specs: { type: "SATA SSD", capacity: "500GB" },
        campaign: { installment: 1, bank: "None" },
        reviews: [
            { user: "LaptopSaver", rating: 4, text: "Revived my old laptop with this." },
            { user: "BasicStorage", rating: 3, text: "Good for the price, but plastic casing gets warm." }
        ]
    },
    {
        id: 502,
        name: "Kingston NV2 1TB",
        category: "storage",
        price: 65,
        image: "assets/products/ssd-nv2.jpg",
        specs: { type: "NVMe Gen4", capacity: "1TB" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "ValueHunter", rating: 5, text: "Cheapest Gen4 drive I could find. Works great." },
            { user: "Gamer", rating: 4, text: "Fast loading times." }
        ]
    },
    {
        id: 503,
        name: "Samsung 980 PRO 1TB",
        category: "storage",
        price: 99,
        image: "assets/products/ssd-980.jpg",
        specs: { type: "NVMe Gen4", capacity: "1TB" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "SpeedDemon", rating: 5, text: "Blazing fast speeds. Samsung reliability." },
            { user: "PS5User", rating: 5, text: "Works perfectly in my PS5." }
        ]
    },
    {
        id: 504,
        name: "WD Black SN850X 2TB",
        category: "storage",
        price: 169,
        image: "assets/products/ssd-sn850x.jpg",
        specs: { type: "NVMe Gen4", capacity: "2TB" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "HardcoreGamer", rating: 5, text: "Top tier performance. No stuttering in games." },
            { user: "BigLibrary", rating: 5, text: "Finally enough space for all my games." }
        ]
    },
    {
        id: 505,
        name: "Crucial T700 4TB",
        category: "storage",
        price: 499,
        image: "assets/products/ssd-t700.jpg",
        specs: { type: "NVMe Gen5", capacity: "4TB" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "FutureProof", rating: 5, text: "Gen5 speeds are insane! Files transfer instantly." },
            { user: "HotStuff", rating: 4, text: "Runs hot, make sure your motherboard has a good heatsink." }
        ]
    },

    // --- 6. PSU ---
    {
        id: 601,
        name: "FSP Hydro K 500W",
        category: "psu",
        price: 49,
        image: "assets/products/psu-500.jpg",
        specs: { wattage: "500W", modular: "Non-Modular" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "BudgetBuilder", rating: 4, text: "Quiet and does the job for APU builds." },
            { user: "CableMess", rating: 3, text: "Not modular, so lots of extra cables to hide." }
        ]
    },
    {
        id: 602,
        name: "Corsair CX650F",
        category: "psu",
        price: 89,
        image: "assets/products/psu-650.jpg",
        specs: { wattage: "650W", modular: "Full Modular" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "WhiteTheme", rating: 5, text: "White cables look amazing out of the box." },
            { user: "RGBFan", rating: 5, text: "The RGB fan is a nice touch." }
        ]
    },
    {
        id: 603,
        name: "MSI MPG A750GF",
        category: "psu",
        price: 119,
        image: "assets/products/psu-750.jpg",
        specs: { wattage: "750W", modular: "Full Modular" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "ReliablePower", rating: 5, text: "10 year warranty gives peace of mind." },
            { user: "BuilderBob", rating: 5, text: "Cables are flat and easy to route." }
        ]
    },
    {
        id: 604,
        name: "ASUS ROG Thor 850W",
        category: "psu",
        price: 229,
        image: "assets/products/psu-850.jpg",
        specs: { wattage: "850W", modular: "Full Modular" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "TechFlex", rating: 5, text: "The OLED screen showing wattage is the coolest feature ever." },
            { user: "SilentMode", rating: 5, text: "Fan barely ever spins up." }
        ]
    },
    {
        id: 605,
        name: "Be Quiet! Dark Power 1300W",
        category: "psu",
        price: 459,
        image: "assets/products/psu-1300.jpg",
        specs: { wattage: "1300W", modular: "Full Modular" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "SilenceLover", rating: 5, text: "Dead silent even under load. True to its name." },
            { user: "MultiGPU", rating: 5, text: "Powering 2x 4090s without breaking a sweat." },
            { user: "StiffCables", rating: 4, text: "Amazing unit but cables are a bit stiff." }
        ]
    },

    // --- 7. Cases ---
    {
        id: 701,
        name: "DeepCool Matrexx 30",
        category: "case",
        price: 45,
        image: "assets/products/case-matrexx.jpg",
        specs: { formFactor: "mATX", brand: "DeepCool" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "CompactUser", rating: 4, text: "Good small case for office builds." },
            { user: "CableMgt", rating: 3, text: "Very little space for cable management." }
        ]
    },
    {
        id: 702,
        name: "NZXT H5 Flow",
        category: "case",
        price: 95,
        image: "assets/products/case-h5.jpg",
        specs: { formFactor: "ATX", brand: "NZXT" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "AirflowKing", rating: 5, text: "The bottom fan for GPU is a genius idea. Great temps." },
            { user: "CleanLook", rating: 5, text: "Minimalist design fits any room." }
        ]
    },
    {
        id: 703,
        name: "Corsair 4000D",
        category: "case",
        price: 105,
        image: "assets/products/case-4000d.jpg",
        specs: { formFactor: "ATX", brand: "Corsair" },
        campaign: { installment: 6, bank: "Bonus" },
        reviews: [
            { user: "Standard", rating: 5, text: "The gold standard for PC cases. Easy to build in." },
            { user: "FirstBuild", rating: 5, text: "First time building and this case made it simple." }
        ]
    },
    {
        id: 704,
        name: "Lian Li O11 Dynamic",
        category: "case",
        price: 169,
        image: "assets/products/case-o11.jpg",
        specs: { formFactor: "E-ATX", brand: "Lian Li" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "ShowCase", rating: 5, text: "Looks like a fish tank, perfect for displaying components." },
            { user: "FanBuyer", rating: 4, text: "Great case but remember it comes with NO fans." }
        ]
    },
    {
        id: 705,
        name: "Cooler Master HAF 700",
        category: "case",
        price: 549,
        image: "assets/products/case-haf.jpg",
        specs: { formFactor: "E-ATX", brand: "Cooler Master" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "TheBeast", rating: 5, text: "This is not a case, it's a tank. Massive airflow." },
            { user: "HeavyLifter", rating: 4, text: "Extremely heavy, do not plan on moving it often." },
            { user: "ToolLess", rating: 5, text: "Tool-less installation for everything is amazing." }
        ]
    },

    // --- 8. Cooling ---
    {
        id: 801,
        name: "Intel Stock Cooler",
        category: "cooling",
        price: 15,
        image: "assets/products/cool-stock.jpg",
        specs: { type: "Air", size: "Standard" },
        campaign: { installment: 1, bank: "None" },
        reviews: [
            { user: "CheapUser", rating: 3, text: "It works, but gets loud under load." },
            { user: "HotCPU", rating: 2, text: "Not enough for i7 or i9." }
        ]
    },
    {
        id: 802,
        name: "DeepCool AK400",
        category: "cooling",
        price: 35,
        image: "assets/products/cool-ak400.jpg",
        specs: { type: "Air Tower", size: "120mm" },
        campaign: { installment: 3, bank: "WorldCard" },
        reviews: [
            { user: "BudgetCooling", rating: 5, text: "Best budget cooler on the market. Silent and effective." },
            { user: "Installer", rating: 5, text: "Mounting system is very easy." }
        ]
    },
    {
        id: 803,
        name: "Arctic Liquid Freezer 240",
        category: "cooling",
        price: 99,
        image: "assets/products/cool-arctic240.jpg",
        specs: { type: "AIO Liquid", size: "240mm" },
        campaign: { installment: 6, bank: "Axess" },
        reviews: [
            { user: "SilenceSeeker", rating: 5, text: "Pump is dead silent. The VRM fan actually helps." },
            { user: "ThickRad", rating: 4, text: "Radiator is thicker than standard, check clearance." }
        ]
    },
    {
        id: 804,
        name: "NZXT Kraken Elite 360",
        category: "cooling",
        price: 289,
        image: "assets/products/cool-kraken360.jpg",
        specs: { type: "AIO Liquid", size: "360mm" },
        campaign: { installment: 9, bank: "Maximum" },
        reviews: [
            { user: "GifLover", rating: 5, text: "Putting GIFs on the pump screen is addictive." },
            { user: "CoolAndStylish", rating: 5, text: "Keeps my CPU frosty and looks incredible." }
        ]
    },
    {
        id: 805,
        name: "Corsair iCUE H170i",
        category: "cooling",
        price: 349,
        image: "assets/products/cool-h170.jpg",
        specs: { type: "AIO Liquid", size: "420mm" },
        campaign: { installment: 12, bank: "Paraf" },
        reviews: [
            { user: "Overkill", rating: 5, text: "420mm radiator is massive. Cooling performance is unmatched." },
            { user: "BigCaseNeeded", rating: 5, text: "Make sure your case supports 420mm rads!" }
        ]
    }
];

// Global Accessor
function getProducts() {
    return products;
}