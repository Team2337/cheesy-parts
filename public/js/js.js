$(document).ready(function() {
    $(":text:visible:enabled:first").focus();
});

function verifyPasswordMatch(form) {
  if (form.password.value == form.password2.value) {
    return true;
  } else {
    alert("The passwords do not match.");
    return false;
  }
}

function verifyFileTypes(form) {
  if(form.drawing.value.match(/\.[^\.]+$/) != ".pdf" && form.drawing.value != ""){
      alert("Drawing file type is invalid. Please submit a PDF drawing.");
      return false;
  }
  if(form.drawing.files[0].size/1024/1024 > 1) {  // TODO: Make max file size configurable
    alert("Drawing must be less than 1MB.")
    return false;
  }
  return true;
}

// Global variables to store current filter state for auto-refresh.
var dashboardProjectId, dashboardStatus;

function changeDashboardFilter(projectId, status) {
  dashboardProjectId = projectId;
  dashboardStatus = status;
  loadParts();
}

function loadParts() {
  $.ajax({
    url: "/projects/" + dashboardProjectId + "/dashboard/parts?status=" + dashboardStatus,
    complete: function(response) {
      $("#dashboard-parts").html(response.responseText);
      $("#dashboard-parts").tooltip({
        selector: ".dashboard-part",
        placement: "bottom"
      });
    }
  });
}

function vendorAutoComplete(selector) {
  $(selector).typeahead({
    source: vendors
  });
}

// Only allow editing one item at a time.
var editingOrderItem = false;

function editOrderItem(projectId, orderItemId) {
  if (editingOrderItem) {
    alert("Can only edit one item at a time.");
    return;
  }
  editingOrderItem = true;
  $.ajax({
    url: "/projects/" + projectId + "/order_items/" + orderItemId + "/editable",
    complete: function(response) {
      $("#order-item-" + orderItemId).html(response.responseText);
      vendorAutoComplete("#edit-vendor");
      $("#edit-vendor").focus();
    }
  });
}

$(function() {
  vendorAutoComplete("#vendor");
  $(".datepicker").datepicker();
});
