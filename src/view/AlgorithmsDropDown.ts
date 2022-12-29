export function bindDropDown() {
    document.getElementById('alg-drop-down')!.addEventListener('mouseover', () => {
        const arrow = document.getElementById('alg-arr')!;
        const content = document.getElementById('alg-drop-down-content')!;
        content.style.display = 'block';
        arrow.className = 'arrowDown';
    }, true);
    document.getElementById('alg-drop-down')!.addEventListener('mouseleave', () => {
        const arrow = document.getElementById('alg-arr')!;
        const content = document.getElementById('alg-drop-down-content')!;
        content.style.display = 'none';
        arrow.className = 'arrowUp';
    }, true);
    document.getElementById('clr-drop-down')!.addEventListener('mouseover', () => {
        const arrow = document.getElementById('clr-arr')!;
        const content = document.getElementById('clr-drop-down-content')!;
        content.style.display = 'block';
        arrow.className = 'arrowDownW';
    }, true);
    document.getElementById('clr-drop-down')!.addEventListener('mouseleave', () => {
        const arrow = document.getElementById('clr-arr')!;
        const content = document.getElementById('clr-drop-down-content')!;
        content.style.display = 'none';
        arrow.className = 'arrowUpW';
    }, true);
}