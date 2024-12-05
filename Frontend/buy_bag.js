// Strategy Interface
class Bag {
    carry() {
        throw new Error("This method must be overridden");
    }
}

// Concrete Strategy 1: ClothBag
class ClothBag extends Bag {
    carry() {
        return "Carrying items in a cloth bag.";
    }
}

// Concrete Strategy 2: PlasticBag
class PlasticBag extends Bag {
    carry() {
        return "Carrying items in a plastic bag.";
    }
}

// Concrete Strategy 3: Trolley
class Trolley extends Bag {
    carry() {
        return "Carrying items in a trolley.";
    }
}

// Concrete Strategy 4: NoBag
class NoBag extends Bag {
    carry() {
        return "Not carrying any bag.";
    }
}

// Context: Shopper
class Shopper {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    carryItems() {
        return this.strategy.carry();
    }
}

// Client Code
const clothBag = new ClothBag();
const plasticBag = new PlasticBag();
const trolley = new Trolley();
const noBag = new NoBag();

// Initially using ClothBag
const shopper = new Shopper(clothBag);
console.log(shopper.carryItems()); // Output: Carrying items in a cloth bag.

shopper.setStrategy(plasticBag); // Switching to PlasticBag
console.log(shopper.carryItems()); // Output: Carrying items in a plastic bag.

shopper.setStrategy(trolley); // Switching to Trolley
console.log(shopper.carryItems()); // Output: Carrying items in a trolley.

shopper.setStrategy(noBag); // Switching to NoBag
console.log(shopper.carryItems()); // Output: Not carrying any bag.

let selectedBag = null;

// Function to show the dropdown menu and select a bag
const showBagDropdown = () => {
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.classList.toggle("hidden");
};

const selectBag = (bagType) => {
    if (bagType === "clothBag") {
        shopper.setStrategy(clothBag);
    } else if (bagType === "plasticBag") {
        shopper.setStrategy(plasticBag);
    } else if (bagType === "trolley") {
        shopper.setStrategy(trolley);
    } else if (bagType === "noBag") {
        shopper.setStrategy(noBag);
    }
    
    alert(shopper.carryItems());  // Display the selected bag's message
    const dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.classList.add("hidden");  // Hide dropdown after selection
};
