"""Envia un script .py a Blender (addon MCP, puerto 9876). Uso: python3 bl.py script.py"""
import socket, json, sys
code = open(sys.argv[1]).read()
s = socket.create_connection(("localhost", 9876), timeout=60)
s.sendall(json.dumps({"type": "execute_code", "params": {"code": code}}).encode())
data = b""
while True:
    c = s.recv(65536)
    if not c: break
    data += c
    try: json.loads(data); break
    except Exception: pass
print(json.dumps(json.loads(data), indent=1, ensure_ascii=False)[:3000])
