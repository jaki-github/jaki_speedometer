(function() {
    const speedometer = document.createElement('div');
    speedometer.id = 'speedometer';
    speedometer.className = 'hidden';
    speedometer.style.position = 'absolute';
    speedometer.style.bottom = '30px';
    speedometer.style.left = '350px';
    speedometer.style.width = '250px';
    speedometer.style.color = 'white';
    speedometer.style.padding = '10px';
    speedometer.style.borderRadius = '8px';
    speedometer.style.zIndex = '1000';
    speedometer.innerHTML = `
        <div class="flex items-center">
            <div class="flex flex-col items-center bg-gray-800 bg-opacity-75 p-2 rounded-md mr-2 text-center">
                <div class="text-base font-bold direction">N</div>
                <div class="text-white text-sm mt-1 icon">
                    <i class="mdi mdi-car-shift-pattern text-sm"></i>
                </div>
            </div>
            <div class="flex items-baseline font-bold text-3xl speed">
                <span class="text-5xl speed-value">000</span>
                <span class="text-3xl speed-unit ml-1 mt-1">KM/H</span>
            </div>
        </div>
        <div class="w-full h-3 bg-gray-700 mt-2 rounded-sm overflow-hidden relative">
            <div class="fill h-full bg-gray-600 bg-opacity-75 transition-width duration-100" style="width: 100%;"></div>
        </div>
    `;
    document.body.appendChild(speedometer);
    const updateSpeedometer = (function() {
        return function(speed, gear, fuel) {
            speedometer.style.display = 'block';
            speedValue.textContent = String(speed).padStart(3, '0');
            direction.textContent = gear;
            fuelBar.style.width = `${fuel}%`;
        };
    })();
    const hideSpeedometer = (function() {
        return function() {
            speedometer.style.display = 'none';
        };
    })();
    const speedValue = speedometer.querySelector('.speed-value');
    const direction = speedometer.querySelector('.direction');
    const fuelBar = speedometer.querySelector('.fill');
    window.addEventListener('message', (function() {
        return function(event) {
            const { action, speed, gear, fuel } = event.data;

            if (action === "updateSpeedometer") {
                updateSpeedometer(speed, gear, fuel);
            } else if (action === "hideSpeedometer") {
                hideSpeedometer();
            }
        };
    })());
})();
