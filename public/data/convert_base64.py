import base64

client_id = "b094df9818f245aba74ada3925a663ed"
client_secret = "fd2a2adedce44539868b565adb79a9f8"
print(base64.b64encode((client_id+":"+client_secret).encode("utf-8")))
