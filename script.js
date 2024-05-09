// Define the DFA
        // after, although, and, as, because, before, but, 
        // for, if, nor, or, since, so, than, that, though, 
        // till, until, when, yet
        var dfa = {
            'q0': {'a': 'q1', 'b':'q13', 'f':'q23', 'i':'q25', 'n':'q23','o':'q24','s':'q26', 't':'q29', 'u':'q34', 'w':'q37', 'y':'q40', 'default': 'q21'},
            'q1': {'n': 'q2', 'f': 'q4', 'l': 'q7', 's':'q3', 'default': 'q21'},
            'q2': {'d': 'q3', 'default': 'q21'},
            'q3': {'default': 'q21'},
            'q4': {'t': 'q5', 'default': 'q21'},
            'q5': {'e': 'q6', 'default': 'q21'},
            'q6': {'r': 'q3', 'default': 'q21'},
            'q7': {'t': 'q8', 'default': 'q21'},
            'q8': {'h': 'q9', 'default': 'q21'},
            'q9': {'o': 'q10', 'default': 'q21'},
            'q10': {'u': 'q11', 'default': 'q21'},
            'q11': {'g': 'q12', 'default': 'q21'},
            'q12': {'h': 'q3', 'default': 'q21'},
            'q13': {'e': 'q14', 'u':'q22', 'default': 'q21'},
            'q14': {'c': 'q15', 'f': 'q19', 'default': 'q21'},
            'q15': {'a': 'q16', 'default': 'q21'},
            'q16': {'u': 'q17', 'default': 'q21'},
            'q17': {'s': 'q18', 'default': 'q21'},
            'q18': {'e': 'q3', 'default': 'q21'},
            'q19': {'o': 'q20', 'default': 'q21'},
            'q20': {'r': 'q18', 'default': 'q21'},
            'q22': {'t': 'q3', 'default': 'q21'},
            'q23': {'o':'q24', 'default': 'q21'},
            'q24': {'r':'q3', 'default': 'q21'},
            'q25': {'f':'q3', 'default': 'q21'},
            'q26': {'i':'q27', 'o':'q3', 'default': 'q21'},
            'q27': {'n':'q28', 'default': 'q21'},
            'q28': {'c':'q18', 'default': 'q21'},
            'q29': {'h':'q30', 'i':'q32', 'default': 'q21'},
            'q30': {'a':'q31', 'o':'q10', 'default': 'q21'},
            'q31': {'n':'q3', 't':'q3', 'default': 'q21'},
            'q32': {'l':'q33', 'default': 'q21'},
            'q33': {'l':'q3', 'default': 'q21'},
            'q34': {'n':'q35', 'default': 'q21'},
            'q35': {'t':'q36', 'default': 'q21'},
            'q36': {'i':'q33', 'default': 'q21'},
            'q37': {'h':'q38', 'default': 'q21'},
            'q38': {'e':'q39', 'default': 'q21'},
            'q39': {'n':'q3', 'default': 'q21'},
            'q40': {'e':'q22', 'default': 'q21'},

            'q21': {
                'a': 'q21', 'b': 'q21', 'c': 'q21', 'd': 'q21', 'e': 'q21', 
                'f': 'q21', 'g': 'q21', 'h': 'q21', 'i': 'q21', 'j': 'q21', 
                'k': 'q21', 'l': 'q21', 'm': 'q21', 'n': 'q21', 'o': 'q21', 
                'p': 'q21', 'q': 'q21', 'r': 'q21', 's': 'q21', 't': 'q21', 
                'u': 'q21', 'v': 'q21', 'w': 'q21', 'x': 'q21', 'y': 'q21', 
                'z': 'q21', '0': 'q21', '1': 'q21', '2': 'q21', '3': 'q21', 
                '4': 'q21', '5': 'q21', '6': 'q21', '7': 'q21', '8': 'q21', 
                '9': 'q21', 'default': 'q21'
            }
        };
        
        var acceptedStates = new Set(['q3']);

        function isAccepted(word, callback, highlightCallback) {
            var state = 'q0'; // Set the initial state
            word = word.toLowerCase(); // Convert the word to lowercase
            var i = 0; // Initialize counter
        
            // Use a self-invoking function to create a loop with delay
            (function loop() {
                if (i < word.length) {
                    var char = word[i];
                    if (state in dfa && char in dfa[state]) {
                        state = dfa[state][char];
                    } else if (state in dfa && 'default' in dfa[state]) {
                        state = dfa[state]['default'];
                    } else {
                        document.getElementById('status').innerHTML = 'Character: ' + char + ', No transition found. Word rejected.';
                        callback(false);
                        return;
                    }
                    // Update the interface with the current state
                    document.getElementById('status').innerHTML = 'Character: ' + char + ', New state: ' + state;
                    highlightCallback(i, acceptedStates.has(state)); // Highlight the current character
                    i++;
                    setTimeout(loop, 70); // Delay next iteration
                } else {
                    if (acceptedStates.has(state)) {
                        document.getElementById('status').innerHTML = 'Word accepted.';
                        callback(true);
                    } else {
                        document.getElementById('status').innerHTML = 'No final state reached. Word rejected.';
                        callback(false);
                    }
                }
            })();
        }

        function highlightAcceptedWords(paragraph, callback) {
            var words = paragraph.split(' ');
            var highlightedWords = [];
            var i = 0;
        
            (function loop() {
                if (i < words.length) {
                    var word = words[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/<br>/g, "");
                    isAccepted(word, function(accepted) {
                        if (accepted) {
                            highlightedWords.push('<span class="highlight">' + words[i] + '</span>');
                        } else {
                            highlightedWords.push(words[i]);
                        }
                        i++;
                        loop();
                    }, function(charIndex, isAccepted) {
                        // Update the paragraph to highlight the current character
                        var highlightedWord = words[i].substr(0, charIndex) +
                            '<span class="current">' + words[i][charIndex] + '</span>' +
                            words[i].substr(charIndex + 1);
                        document.getElementById('paragraph').innerHTML = highlightedWords.join(' ') + ' ' + highlightedWord + ' ' + words.slice(i + 1).join(' ');
                    });
                } else {
                    callback(highlightedWords.join(' '));
                }
            })();
        }  

        function setupFileInputAndDropZone() {
            var fileInput = document.getElementById('fileInput');
            var dropZone = document.getElementById('drop_zone');
            var fileInputDiv = document.getElementById('fileInputDiv');

            // Handle file selection for both input and drop zone
            function handleFileSelect(evt) {
                var file;
                if (evt.type === 'drop') {
                    evt.stopPropagation();
                    evt.preventDefault();
                    file = evt.dataTransfer.files[0]; // FileList object.
                } else {
                    file = evt.target.files[0];
                }

                // Only process .txt files.
                if (!file.type.match('text.*')) {
                    alert("Only .txt files are accepted");
                    return;
                }

                // Update the status text
                fileInputDiv.textContent = 'Reading ' + file.name;
                fileInputDiv.style.color = '#141111';
                fileInputDiv.style.animation = 'blink 2s infinite';

                var reader = new FileReader();
                reader.onload = function(e) {
                    var contents = e.target.result;

                    // Call your function with the file contents
                    highlightAcceptedWords(contents, function(highlightedParagraph) {
                        document.getElementById('paragraph').innerHTML = highlightedParagraph;    
                        // After processing, return to the initial state
                        
                        fileInputDiv.innerHTML = `
                        <input type="file" id="fileInput" accept=".txt" style="margin: 20px auto; padding: 10px; font-size: 16px; color:  #141111;">
                        <p style="display: flex; justify-content: center; align-items: center; height: 100%;">OR</p>            
                        <div id="drop_zone" style="border: 2px dashed #aaa; padding: 10px 10px 10px 10px; text-align: center; margin: 20px auto 20px auto; width: 50%; height: 100px; line-height: 100px; color: #aaa; font-size: 16px;">
                            Drop files here
                        </div>`;     
                        fileInputDiv.style.animation = 'none';               
                        setupFileInputAndDropZone(); // Set up the new file input and drop zone               
                    });
                };
                reader.readAsText(file);
            }

            // Handle drag over event
            function handleDragOver(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }

            // Add event listeners
            fileInput.addEventListener('change', handleFileSelect, false);
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', handleFileSelect, false);
        }

        // Call the function initially
        setupFileInputAndDropZone();