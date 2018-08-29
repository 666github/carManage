using SuperSocket.SocketBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarManageSystem.Service
{
    public class GPSSession : AppSession<GPSSession, GPSRequestInfo>
    {
        protected override void HandleException(Exception e)
        {
            //this.Send("Application error: {0}", e.Message);
        }

        protected override void HandleUnknownRequest(GPSRequestInfo requestInfo)
        {
            //this.Send("UnknowRequest" + requestInfo.Key);
        }

        protected override void OnSessionClosed(CloseReason reason)
        {
            base.OnSessionClosed(reason);
            //Console.WriteLine("Closed:" + reason);
        }

        protected override void OnSessionStarted()
        {
            //this.Send("Welcome to my Server!Yeah");
        }
    }
}
