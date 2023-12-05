window.onload = function() {
    const hashtags = [
        '#MediaLit', '#edtechSR', '#create2learn', '#edtech',
        '#BigTech', '#googleEDU', '#politics', '#ConCW',
        '#MediaLiteracy', '#polarization'
    ];
    const hashtagDiv = document.getElementById('hashtags');
    hashtags.forEach(hashtag => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${hashtag}">${hashtag}`;
        hashtagDiv.appendChild(label);
    });
};

function addCopyButton(parentElement, textBox) {
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.onclick = function() {
        navigator.clipboard.writeText(textBox.value);
    };
    parentElement.appendChild(copyButton);
    parentElement.appendChild(document.createElement('br'));
}

function prepareText(platform, charLimit) {
    const textInput = document.getElementById('text-input').value;
    const other1 = document.getElementById('other1').value;
    const other2 = document.getElementById('other2').value;
    let hashtags = '';
    document.querySelectorAll('#hashtags input:checked').forEach(checkbox => {
        hashtags += ' ' + checkbox.value;
    });
    hashtags += ` ${other1} ${other2}`;
    const fullText = textInput + hashtags;
    
    const resultSection = document.getElementById('result-section');
    resultSection.innerHTML = `Share on ${platform}<br>`;
    
    if (fullText.length <= charLimit) {
        const textBox = document.createElement('textarea');
        textBox.rows = 4;
        textBox.style.width = '800px';  // Set the width to 800px
        textBox.value = fullText;
        resultSection.appendChild(textBox);
        addCopyButton(resultSection, textBox);  // Add the copy button
    } else {
        const words = fullText.split(' ');
        let currentPart = '';
        let partIndex = 0;
        let threadCount = 0;
        words.forEach(word => {
            if ((currentPart + word).length <= charLimit) {
                currentPart += (currentPart ? ' ' : '') + word;
            } else {
                threadCount++;
                const textBox = document.createElement('textarea');
                textBox.rows = 4;
                textBox.style.width = '800px';  // Set the width to 800px
                textBox.value = `(${threadCount}/ ) ${currentPart}`;
                resultSection.appendChild(textBox);
                addCopyButton(resultSection, textBox);  // Add the copy button
                currentPart = word;
            }
        });
        if (currentPart) {
            threadCount++;
            const textBox = document.createElement('textarea');
            textBox.rows = 4;
            textBox.style.width = '800px';  // Set the width to 800px
            textBox.value = `(${threadCount}/${threadCount}) ${currentPart}`;
            resultSection.appendChild(textBox);
            addCopyButton(resultSection, textBox);  // Add the copy button
        }
        // Update all text boxes with the correct thread count
        resultSection.querySelectorAll('textarea').forEach(textBox => {
            textBox.value = textBox.value.replace(/(\/ )/, `/${threadCount}`);
        });
    }
}