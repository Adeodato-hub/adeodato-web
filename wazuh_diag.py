import paramiko
import time

HOST = "100.117.63.55"
USER = "wazuh-user"
PASS = "pantocratorAdeodato"

def run_cmd(ssh, cmd, label):
    print(f"\n{'='*60}")
    print(f"  {label}")
    print(f"{'='*60}")
    print(f"$ {cmd}\n")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=30)
    out = stdout.read().decode(errors="replace").strip()
    err = stderr.read().decode(errors="replace").strip()
    if out:
        print(out)
    if err:
        print(f"[STDERR]\n{err}")
    return out, err

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print(f"Connecting to {HOST} as {USER}...")
    client.connect(HOST, username=USER, password=PASS, timeout=15, look_for_keys=False, allow_agent=False)
    print("Connected.\n")

    run_cmd(client, "systemctl status wazuh-manager --no-pager", "1. WAZUH MANAGER STATUS")
    run_cmd(client, "/var/ossec/bin/agent_control -l 2>&1", "2. CONNECTED AGENTS")
    run_cmd(client, "tail -20 /var/ossec/logs/alerts/alerts.log 2>&1", "3. RECENT ALERTS (last 20 lines)")
    run_cmd(client, "ss -tlnp | grep 55000 || netstat -tlnp | grep 55000 2>/dev/null || echo 'Port 55000 not listening'", "4. WAZUH API PORT 55000")
    run_cmd(client, "systemctl status wazuh-api --no-pager 2>/dev/null || systemctl status wazuh-apid --no-pager 2>/dev/null || echo 'No wazuh-api service found'", "5. WAZUH API SERVICE STATUS")
    run_cmd(client, "cat /var/ossec/logs/ossec.log 2>/dev/null | tail -30", "6. OSSEC LOG (last 30 lines)")

    client.close()
    print("\nDone. Session closed.")

if __name__ == "__main__":
    main()
