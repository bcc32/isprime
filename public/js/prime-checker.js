$(function() {
    $('#n').keyup(function() {
        var n = $(this).val();
        if (n !== '') {
            $.getJSON('/is_prime/' + n, function(data) {
                $('#result').text(data);
            });
        } else {
            $('#result').text('');
        }
    });
});
