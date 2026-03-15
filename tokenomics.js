let contractAddress = '';
let updateInterval;

async function initTokenomics() {
    const urlParams = new URLSearchParams(window.location.search);
    const contract = urlParams.get('contract');
    
    if (contract) {
        contractAddress = contract;
        localStorage.setItem('pepe_contract', contract);
    } else {
        contractAddress = localStorage.getItem('pepe_contract') || 'J86fDdAaEPqLFyXg7RyxnWZuj9rskTrGisnXY5wppump';
    }
    
    if (contractAddress) {
        document.getElementById('contract-address').value = contractAddress;
        await fetchTokenData();
        updateInterval = setInterval(fetchTokenData, 30000);
    } else {
        showContractPrompt();
    }
    
    initMatrixRain();
    setupEventListeners();
}

function showContractPrompt() {
    const contractInput = document.getElementById('contract-address');
    contractInput.removeAttribute('readonly');
    contractInput.placeholder = 'paste contract address here...';
    contractInput.value = '';
    
    const copyBtn = document.getElementById('copy-contract');
    copyBtn.textContent = 'SET';
    copyBtn.onclick = () => {
        const address = contractInput.value.trim();
        if (address) {
            contractAddress = address;
            localStorage.setItem('pepe_contract', address);
            contractInput.setAttribute('readonly', true);
            copyBtn.textContent = 'COPY';
            copyBtn.onclick = copyContract;
            fetchTokenData();
            updateInterval = setInterval(fetchTokenData, 30000);
        }
    };
}

async function fetchTokenData() {
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch token data');
        }
        
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
            const pair = data.pairs[0];
            updateUI(pair);
        } else {
            throw new Error('No trading pairs found');
        }
        
    } catch (error) {
        console.error('Error fetching token data:', error);
        
        document.getElementById('price-value').textContent = '$0.00000';
        document.getElementById('price-change').textContent = 'Error loading data';
        document.getElementById('mcap-value').textContent = '--';
        document.getElementById('liquidity-value').textContent = '--';
        document.getElementById('volume-value').textContent = '--';
        document.getElementById('holders-value').textContent = '--';
    }
}

function updateUI(pair) {
    const price = parseFloat(pair.priceUsd) || 0;
    const priceFormatted = price < 0.000001 ? price.toExponential(4) : `$${price.toFixed(8)}`;
    document.getElementById('price-value').textContent = priceFormatted;
    
    const priceChange = document.getElementById('price-change');
    if (pair.priceChange && pair.priceChange.h24 !== undefined) {
        const change = parseFloat(pair.priceChange.h24);
        priceChange.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}% (24h)`;
        priceChange.style.color = change >= 0 ? '#7cb342' : '#ff4444';
    } else {
        priceChange.textContent = '--';
    }
    
    const mcap = parseFloat(pair.fdv) || parseFloat(pair.marketCap) || 0;
    document.getElementById('mcap-value').textContent = `$${formatNumber(mcap)}`;
    
    const liquidity = parseFloat(pair.liquidity?.usd) || 0;
    document.getElementById('liquidity-value').textContent = `$${formatNumber(liquidity)}`;
    
    const volume = parseFloat(pair.volume?.h24) || 0;
    document.getElementById('volume-value').textContent = `$${formatNumber(volume)}`;
    
    const holders = pair.txns?.h24?.buys + pair.txns?.h24?.sells || 0;
    document.getElementById('holders-value').textContent = formatNumber(holders);
    
    const buyLink = document.getElementById('buy-link');
    if (buyLink) {
        buyLink.href = `https://pump.fun/${contractAddress}`;
    }
    
    const chartLink = document.getElementById('chart-link');
    if (chartLink) {
        chartLink.href = pair.url || `https://dexscreener.com/solana/${contractAddress}`;
    }
    
    const dextoolsLink = document.getElementById('dextools-link');
    if (dextoolsLink) {
        dextoolsLink.href = `https://www.dextools.io/app/solana/pair-explorer/${pair.pairAddress}`;
    }
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
}

function copyContract() {
    const contractInput = document.getElementById('contract-address');
    contractInput.select();
    document.execCommand('copy');
    
    const copyBtn = document.getElementById('copy-contract');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'COPIED!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 2000);
}

function setupEventListeners() {
    const copyBtn = document.getElementById('copy-contract');
    if (contractAddress && copyBtn.textContent === 'COPY') {
        copyBtn.addEventListener('click', copyContract);
    }
}

function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

initTokenomics();
