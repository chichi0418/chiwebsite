/* <!--112550081 許秉棋 第II次作業10/11
	112550081 Ping Chi Hsu The Second Homework 10/11--> */

    // Function to display number using digit images
function displayNumberImages(num, elementId) {
    var element = document.getElementById(elementId);
    element.innerHTML = ''; // clear previous content 

    var numStr = num.toString();
    for (var i = 0; i < numStr.length; i++) {
        var digit = numStr.charAt(i);
        var img = document.createElement('img');
        img.src = 'images/' + digit + '.png';
        img.alt = digit;
        element.appendChild(img);
    }
}

// Function to display median with digit images and dot
function displayMedian(median, elementId) {
    var element = document.getElementById(elementId);
    element.innerHTML = ''; // clear previous content 

    var medianStr = median.toString();
    for (var i = 0; i < medianStr.length; i++) {
        var char = medianStr.charAt(i);
        if (char === '.') {
            var dot = document.createElement('span');
            dot.className = 'dot';
            dot.innerText = '.';
            element.appendChild(dot);
        } else {
            var img = document.createElement('img');
            img.src = 'images/' + char + '.png';
            img.alt = char;
            img.className = 'digit-image small-img';
            element.appendChild(img);
        }
    }
}

// Function to validate the number range
function isValid(num) {
    return num >= 1 && num <= 999;
}

// Function to find maximum
function findMax(n1, n2, n3, n4, n5, n6, n7, n8) {
    var max = n1;
    if (n2 > max) max = n2;
    if (n3 > max) max = n3;
    if (n4 > max) max = n4;
    if (n5 > max) max = n5;
    if (n6 > max) max = n6;
    if (n7 > max) max = n7;
    if (n8 > max) max = n8;
    return max;
}

// Function to find minimum
function findMin(n1, n2, n3, n4, n5, n6, n7, n8) {
    var min = n1;
    if (n2 < min) min = n2;
    if (n3 < min) min = n3;
    if (n4 < min) min = n4;
    if (n5 < min) min = n5;
    if (n6 < min) min = n6;
    if (n7 < min) min = n7;
    if (n8 < min) min = n8;
    return min;
}

// Function to find median
function findMedian(n1, n2, n3, n4, n5, n6, n7, n8) {
    // compute median
    var total = n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;
    return (total / 8).toFixed(2);
}

// Function to check prime
function isPrime(num) {
    if (num < 2) return false;
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check Armstrong (Narcissistic) number
function isArmstrong(num) {
    var sum = 0;
    var temp = num;
    var digits = num.toString().length;
    while (temp > 0) {
        var digit = temp % 10;
        sum += Math.pow(digit, digits);
        temp = Math.floor(temp / 10);
    }
    return sum === num;
}

// Function to check Fibonacci number
function isFibonacci(num) {
    // A number is Fibonacci if one of (5*num*num + 4) or (5*num*num -4) is a perfect square
    function isPerfectSquare(x) {
        var s = Math.floor(Math.sqrt(x));
        return s * s === x;
    }
    return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

// Event listener for input fields to display images in real-time
function setupInputListeners() {
    for (var i = 1; i <= 8; i++) {
        (function(index){
            var input = document.getElementById('num' + index);
            var imgDiv = document.getElementById('img-num' + index);
            input.addEventListener('input', function(){
                var value = parseInt(this.value);
                if (isValid(value)) {
                    displayNumberImages(value, 'img-num' + index);
                } else {
                    imgDiv.innerHTML = ''; // 清空不合法的輸入
                }
            });
        })(i);
    }
}

// Initialize input listeners
setupInputListeners();

// Event listener for form submission
document.getElementById('integerForm').addEventListener('submit', function(e){
    e.preventDefault();

    // Read input values
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
    var num3 = parseInt(document.getElementById('num3').value);
    var num4 = parseInt(document.getElementById('num4').value);
    var num5 = parseInt(document.getElementById('num5').value);
    var num6 = parseInt(document.getElementById('num6').value);
    var num7 = parseInt(document.getElementById('num7').value);
    var num8 = parseInt(document.getElementById('num8').value);

    // Validate inputs
    var error = '';
    if (!isValid(num1) || !isValid(num2) || !isValid(num3) || !isValid(num4) ||
        !isValid(num5) || !isValid(num6) || !isValid(num7) || !isValid(num8)) {
        error = 'All numbers must be between 1 and 999.';
    }

    if (error !== '') {
        document.getElementById('errorMessage').innerText = error;
        document.getElementById('results').style.display = 'none';
        return;
    } else {
        document.getElementById('errorMessage').innerText = '';
    }

    // Display input numbers using images
    var inputNumbersDiv = document.getElementById('inputNumbers');
    inputNumbersDiv.innerHTML = '';
    // Create a container for input numbers
    var container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '5px';

    // Function to append number images to container
    function appendNumberImages(num){
        var numStr = num.toString();
        for(var i=0; i<numStr.length; i++){
            var img = document.createElement('img');
            img.src = 'images/' + numStr.charAt(i) + '.png';
            img.alt = numStr.charAt(i);
            img.className = 'digit-image small-img';
            container.appendChild(img);
        }
    }

    // Append all 8 numbers
    appendNumberImages(num1);
    appendNumberImages(num2);
    appendNumberImages(num3);
    appendNumberImages(num4);
    appendNumberImages(num5);
    appendNumberImages(num6);
    appendNumberImages(num7);
    appendNumberImages(num8);

    inputNumbersDiv.appendChild(container);

    // Compute Maximum
    var max = findMax(num1, num2, num3, num4, num5, num6, num7, num8);
    displayNumberImages(max, 'max');

    // Compute Minimum
    var min = findMin(num1, num2, num3, num4, num5, num6, num7, num8);
    displayNumberImages(min, 'min');

    // Compute Median
    var median = findMedian(num1, num2, num3, num4, num5, num6, num7, num8);
    // Display median using digit images and dot
    displayMedian(median, 'median');

    // Find Prime Numbers
    var primes = '';
    if(isPrime(num1)) primes += num1 + ' ';
    if(isPrime(num2)) primes += num2 + ' ';
    if(isPrime(num3)) primes += num3 + ' ';
    if(isPrime(num4)) primes += num4 + ' ';
    if(isPrime(num5)) primes += num5 + ' ';
    if(isPrime(num6)) primes += num6 + ' ';
    if(isPrime(num7)) primes += num7 + ' ';
    if(isPrime(num8)) primes += num8 + ' ';
    if(primes === '') primes = 'None';
    // Display primes using images
    var primesDiv = document.getElementById('primes');
    primesDiv.innerHTML = '';
    if(primes !== 'None'){
        var primeNums = primes.trim().split(' ');
        for(var p=0; p<primeNums.length; p++){
            var numStr = primeNums[p];
            for(var d=0; d<numStr.length; d++){
                var img = document.createElement('img');
                img.src = 'images/' + numStr.charAt(d) + '.png';
                img.alt = numStr.charAt(d);
                img.className = 'digit-image small-img';
                primesDiv.appendChild(img);
            }
            // Add space between numbers
            primesDiv.innerHTML += ' ';
        }
    } else {
        primesDiv.innerText = primes;
    }

    // Find Armstrong Numbers
    var armstrongs = '';
    if(isArmstrong(num1)) armstrongs += num1 + ' ';
    if(isArmstrong(num2)) armstrongs += num2 + ' ';
    if(isArmstrong(num3)) armstrongs += num3 + ' ';
    if(isArmstrong(num4)) armstrongs += num4 + ' ';
    if(isArmstrong(num5)) armstrongs += num5 + ' ';
    if(isArmstrong(num6)) armstrongs += num6 + ' ';
    if(isArmstrong(num7)) armstrongs += num7 + ' ';
    if(isArmstrong(num8)) armstrongs += num8 + ' ';
    if(armstrongs === '') armstrongs = 'None';
    // Display armstrongs using images
    var armstrongsDiv = document.getElementById('armstrongs');
    armstrongsDiv.innerHTML = '';
    if(armstrongs !== 'None'){
        var armNums = armstrongs.trim().split(' ');
        for(var a=0; a<armNums.length; a++){
            var numStr = armNums[a];
            for(var d=0; d<numStr.length; d++){
                var img = document.createElement('img');
                img.src = 'images/' + numStr.charAt(d) + '.png';
                img.alt = numStr.charAt(d);
                img.className = 'digit-image small-img';
                armstrongsDiv.appendChild(img);
            }
            // Add space between numbers
            armstrongsDiv.innerHTML += ' ';
        }
    } else {
        armstrongsDiv.innerText = armstrongs;
    }

    // Find Fibonacci Numbers
    var fibonaccis = '';
    if(isFibonacci(num1)) fibonaccis += num1 + ' ';
    if(isFibonacci(num2)) fibonaccis += num2 + ' ';
    if(isFibonacci(num3)) fibonaccis += num3 + ' ';
    if(isFibonacci(num4)) fibonaccis += num4 + ' ';
    if(isFibonacci(num5)) fibonaccis += num5 + ' ';
    if(isFibonacci(num6)) fibonaccis += num6 + ' ';
    if(isFibonacci(num7)) fibonaccis += num7 + ' ';
    if(isFibonacci(num8)) fibonaccis += num8 + ' ';
    if(fibonaccis === '') fibonaccis = 'None';
    // Display fibonaccis using images
    var fibonaccisDiv = document.getElementById('fibonaccis');
    fibonaccisDiv.innerHTML = '';
    if(fibonaccis !== 'None'){
        var fibNums = fibonaccis.trim().split(' ');
        for(var f=0; f<fibNums.length; f++){
            var numStr = fibNums[f];
            for(var d=0; d<numStr.length; d++){
                var img = document.createElement('img');
                img.src = 'images/' + numStr.charAt(d) + '.png';
                img.alt = numStr.charAt(d);
                img.className = 'digit-image small-img';
                fibonaccisDiv.appendChild(img);
            }
            // Add space between numbers
            fibonaccisDiv.innerHTML += ' ';
        }
    } else {
        fibonaccisDiv.innerText = fibonaccis;
    }

    // Show results section
    document.getElementById('results').style.display = 'block';
});
