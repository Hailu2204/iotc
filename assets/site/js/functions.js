//used for pagination
$(document).ready(function () {
    $(".pageNumberInput").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            window.location.href = "?page=" + $(this).val() + "&search=" + $("#pageNumberText").val();
        }

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('.pageNumberInput').bind("cut copy paste", function (e) {
        e.preventDefault();
    });


    $(".pageNumberInputPR").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            window.location.href = "?page=" + $(this).val() + "&year=" + $("#currentYear").val();
        }

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('.pageNumberInputPR').bind("cut copy paste", function (e) {
        e.preventDefault();
    });


    $(".pageNumberInputJob").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            window.location.href = "?page=" + $(this).val();
        }

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    $('.pageNumberInputJob').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

});




$(".formLink").on("click", function (e) {
    //$("#hdnPageID").val($(this).attr('data-pageid'));
    //$("#hdnPageProperty").val($(this).attr('data-property'));
    var href = $(this).attr('href');
    var pageid = $(this).attr('data-pageid');
    
    $.cookie("hdnProductPageID", pageid, { path: "/" });
    //$.cookie("hdnPageProperty", pageproperty, { path: "/" });

    window.open(href + "?returnurl=" + window.location.pathname, "_self", "", true);
    e.preventDefault();
});

$("#btnReset").on("click", function (e) {
    $(':input').not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
});

    
$('#OtherCategoryList').hide();
$('#OtherCategory').hide();
$('#OtherProductService').hide();
$('#OtherProductServiceList').hide();

$('#Category').on('change', function () {
    if ($(this).val() == "Other") {
        $('#OtherCategory').show();
        $('#OtherCategoryList').show();
    } else
    {
        $('#OtherCategory').hide();
        $('#OtherCategoryList').hide();
    }
});

$('#ProductService').on('change', function () {
    if ($(this).val() == "Other") {
        $('#OtherProductService').show();
        $('#OtherProductServiceList').show();
    } else {
        $('#OtherProductService').hide();
        $('#OtherProductServiceList').hide();
    }
});

$('#DrawingsFileValidation').hide();
$('#TechnicalSpecificationsFileValidation').hide();
$('#TechnicalSpecificationsFileExtMsg').hide();
$('#DrawingsFileExtMsg').hide();

$("#frmSubmit").on("click", function (e) {
       
    $('#TechnicalSpecificationsFileExtMsgServer').hide();
    $('#DrawingsFileExtMsgServer').hide();

    if (!($("#TechnicalSpecificationsFile").val())) {
        $('#TechnicalSpecificationsFileValidation').show();        
    }
    else {
        
        var file = $("#TechnicalSpecificationsFile").val();
        var flag = validateFileExt(file);
                    
        if(!flag)
        {
            $('#TechnicalSpecificationsFileExtMsg').show();
        }
        else {
            $('#TechnicalSpecificationsFileExtMsg').hide();
        }
        $('#TechnicalSpecificationsFileValidation').hide();
    }

    if (!($("#DrawingsFile").val())) {
        $('#DrawingsFileValidation').show();        
    }
    else {

        var file = $("#DrawingsFile").val();
        var flag = validateFileExt(file);

        if (!flag) {
            $('#DrawingsFileExtMsg').show();
        }
        else {
            $('#DrawingsFileExtMsg').hide();
        }
        $('#DrawingsFileValidation').hide();
    }

});

$("#customerEnquiryForm").on("submit", function (e) {
    if (!($("#TechnicalSpecificationsFile").val()) || !($("#DrawingsFile").val())) {
        e.preventDefault();
    }
    else
    {
        var allowSubmit = true;

        if (($("#DrawingsFile").val()))
        {
            var file = $("#DrawingsFile").val();
            var flag = validateFileExt(file);

            if (!flag) {
                allowSubmit = false;
                $('#DrawingsFileExtMsg').show();
            }
            else {
                $('#DrawingsFileExtMsg').hide();
            }
        }

        if (($("#TechnicalSpecificationsFile").val())) {
            var file = $("#TechnicalSpecificationsFile").val();
            var flag = validateFileExt(file);

            if (!flag) {
                allowSubmit = false;
                $('#TechnicalSpecificationsFileExtMsg').show();
            }
            else {
                $('#TechnicalSpecificationsFileExtMsg').hide();
            }
        }

        if (!allowSubmit) {
            e.preventDefault();
        }
    }
});


function validateFileExt(file) {
    var flag = true;

    if (file != null) {
        var extension = file.substr((file.lastIndexOf('.') + 1));
        switch (extension) {
            case 'jpg':
            case 'pdf':
                flag = true;
                break;
            default:
                flag = false;
        }
    }
    return flag;
}


$('#InterestedInValMsg').hide();
$("#snlcontactEnquiryForm").on("submit", function (e) 
{    
    if ($("#snlcontactEnquiryForm input:checked").length > 0) {
        $('#InterestedInValMsg').hide();    
    }
    else {
        $('#InterestedInValMsg').show();
        e.preventDefault();
    }
});

$(".ddlBusinessVerticals").change(function () {
    var curVal = $(this).val();
    if (curVal == '') {
        $(".businessDescription").text('');
    } else {
        $(".businessDescription").text((curVal.split('|')[2]));
    }
    
});


function formatColor(color) {
    if (!color.id) { return color.text; }
    var $color = $(
        '<span><span class="colorBox" style="background-color: ' + color.element.value + ';"></span> ' + color.text + '</span>'
     );
    return $color;
};

function formatColorOption(color) {
    if (!color.id) { return color.text; }
    // this next line prevents the currently selected option from showing up in the dropdown list
    if ($('#color').find(':selected').val() == color.element.value) { return null; }
    return formatColor(color);
};


//$('#color').select2({
//    placeholder: "Select a Color",
//    minimumResultsForSearch: Infinity, //removes the search box
//    templateResult: formatColorOption,
//    templateSelection: formatColor
//});



