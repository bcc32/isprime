$(function() {
    var cache = {};

    function display(data) {
        if (typeof data === 'object') {
            return 'Error: ' + data.error;
        }
        var isPrime = data;
        return isPrime ? 'Prime' : 'Not Prime';
    }

    function repaint() {
        var n = $('#n').val();
        var $result = $('#result');
        if (n === '') return $result.text('');
        if (cache[n] != null) return $result.text(display(cache[n]));
        $result.text('...');
    }

    $('#n').keyup(function() {
        var n = $(this).val();
        if (n === '') return repaint();
        if (cache[n] != null) return repaint();
        $('#result').text('...');
        $.getJSON('/is_prime/' + n)
            .done(function(data) {
                cache[n] = data;
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                var data = JSON.parse(jqXHR.responseText);
                cache[n] = data;
            })
            .always(repaint);
    });

    $(document).keyup(function(e) {
        if (e.keyCode === 81) { // q
            $('#n').focus();
        } else if (e.keyCode === 27) { // escape
            $('#n').blur().val('');
        }
    });
});
