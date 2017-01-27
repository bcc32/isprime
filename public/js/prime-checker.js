$(function() {
    $('#n').keyup(function() {
        var n = $(this).val();
        if (n !== '') {
            $.getJSON('/is_prime/' + n)
                .done(function(data) {
                    $('#result').text(data ? 'Prime' : 'Composite');
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    var data = JSON.parse(jqXHR.responseText);
                    $('#result').text('Error: ' + data.error);
                });
        } else {
            $('#result').text('');
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode === 81) { // q
            $('#n').focus();
        } else if (e.keyCode === 27) { // escape
            $('#n').blur().val('');
        }
    });
});
