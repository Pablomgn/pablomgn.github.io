var host = "www.pablomgn.com"
if (window.location.host == host && window.location.protocol != "https:") {
  window.location.protocol = "https:"
}
