const SLOWEST = 16;
const SLOWER = 8;
const MEDIUM = 4;
const FASTER = 1;
const FASTEST = 0;

/**
 * Represents an algorithms settings UI set
 */
export interface SettingsUI
{
    readonly aStarButton: HTMLElement;
    readonly bfsButton: HTMLElement;
    readonly dfsButton: HTMLElement;
    readonly bestFirstButton: HTMLElement;

    readonly algorithmText: HTMLElement;

    readonly manhattanRadio: HTMLInputElement;
    readonly euclideanRadio: HTMLInputElement;
    readonly chebyshevRadio: HTMLInputElement;
    readonly octileRadio: HTMLInputElement;

    readonly bidirectionalCheckBox: HTMLInputElement;
    readonly diagonalsCheckBox: HTMLInputElement;
    readonly visualizeCheckBox: HTMLInputElement;

    readonly speedSlider: HTMLInputElement;
    readonly speedText: HTMLElement;
}

/**
 * A class to store algorithms settings and bind to UI
 */
class AlgorithmsSettings
{
    private settingsUI: SettingsUI;

    private visualizeAlg = true;
    private delayInc = MEDIUM;

    private algorithm = 'a*';

    private heuristicKey = 'euclidean';
    private navigatorKey = 'asterisk';
    private bidirectional = false;

    getAlgorithm() {
        return this.algorithm;
    }

    getHeuristicKey() {
        return this.heuristicKey;
    }

    getNavigatorKey() {
        return this.navigatorKey;
    }

    usingBidirectional() {
        return this.bidirectional;
    }

    willVisualize() {
        return this.visualizeAlg;
    }

    getDelayInc() {
        return this.delayInc;
    }

    constructor(settings: SettingsUI) {
        this.settingsUI = settings;
    }

    /**
     * Bind buttons to modify selected algorithms
     */
    bindButtons() {
        
        this.settingsUI.aStarButton.onclick = () => {
            this.settingsUI.algorithmText.textContent = 'A* Search';
            this.algorithm = 'a*';
            this.enableHeuristics();
            this.enableBidirectional();
        }
        this.settingsUI.bfsButton.onclick = () => {
            this.settingsUI.algorithmText.textContent = 'Breadth First';
            this.algorithm = 'bfs';
            this.disableHeuristics();
            this.enableBidirectional();
        }
        this.settingsUI.dfsButton.onclick = () => {
            this.settingsUI.algorithmText.textContent = 'Depth First';
            this.algorithm = 'dfs';
            this.disableHeuristics();
            this.disableBidirectional();
        }
        this.settingsUI.bestFirstButton.onclick = () => {
            this.settingsUI.algorithmText.textContent = 'Best First';
            this.algorithm = 'best-first';
            this.enableHeuristics();
            this.disableBidirectional();
        }
    }

    disableHeuristics() {
        this.settingsUI.manhattanRadio.disabled = true;
        this.settingsUI.euclideanRadio.disabled = true;
        this.settingsUI.chebyshevRadio.disabled = true;
        this.settingsUI.octileRadio.disabled = true;
    }

    enableHeuristics() {
        this.settingsUI.manhattanRadio.disabled = false;
        this.settingsUI.euclideanRadio.disabled = false;
        this.settingsUI.chebyshevRadio.disabled = false;
        this.settingsUI.octileRadio.disabled = false;
    }

    disableBidirectional() {
        this.settingsUI.bidirectionalCheckBox.disabled = true;
    }

    enableBidirectional() {
        this.settingsUI.bidirectionalCheckBox.disabled = false;
    }

    /**
     * Bind UI to modify settings
     */
    bindSettings() {
        const diagonalsCheckbox = this.settingsUI.diagonalsCheckBox;
        diagonalsCheckbox.onchange = () => {
            if(diagonalsCheckbox.checked) {
                this.navigatorKey = 'asterisk';
            } else {
                this.navigatorKey = 'plus';
            }
        }
        const bidirectionalCheckbox = this.settingsUI.bidirectionalCheckBox;
        bidirectionalCheckbox.onchange = () => {
            this.bidirectional = bidirectionalCheckbox.checked;
        }
        const algCheckbox = this.settingsUI.visualizeCheckBox;
        algCheckbox.onchange = () => {
            this.visualizeAlg = algCheckbox.checked;
        }
        const manhattanCheck = this.settingsUI.manhattanRadio;
        manhattanCheck.onchange = () => {
            if(manhattanCheck.checked) {
                this.heuristicKey = 'manhattan';
            }
        }
        const euclideanCheck = this.settingsUI.euclideanRadio;
        euclideanCheck.onchange = () => {
            if(euclideanCheck.checked) {
                this.heuristicKey = 'euclidean';
            }
        }
        const chebyshevCheck = this.settingsUI.chebyshevRadio;
        chebyshevCheck.onchange = () => {
            if(chebyshevCheck.checked) {
                this.heuristicKey = 'chebyshev';
            }
        }
        const octileCheck = this.settingsUI.octileRadio;
        octileCheck.onchange = () => {
            if(octileCheck.checked) {
                this.heuristicKey = 'octile';
            }
        }
    }

    /**
     * Bind slider to modify algorithm speed
     */
    bindSlider() {
        const slider = this.settingsUI.speedSlider;
        slider.oninput = () => {
            const val = Number.parseInt(slider.value);
            let text = 'Error';
            switch(val) {
                case 1:
                    this.delayInc = SLOWEST;
                    text = 'Slowest';
                    break;
                case 2:
                    this.delayInc = SLOWER;
                    text = 'Slow';
                    break;
                case 3:
                    this.delayInc = MEDIUM;
                    text = 'Medium';
                    break;
                case 4:
                    this.delayInc = FASTER;
                    text = 'Fast';
                    break;
                case 5:
                    this.delayInc = FASTEST;
                    text = 'Fastest';
                    break;
            }
            this.settingsUI.speedText.textContent = text;
        }
    }
}

export default AlgorithmsSettings;