using SuperSocket.SocketBase;
using SuperSocket.SocketBase.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarManageSystem.Service
{
    public class GPSServer : AppServer<GPSSession, GPSRequestInfo>
    {
        public GPSServer():base(new GPSReceiveFilterFactory())
        {

        }

        protected override void OnStartup()
        {
            base.OnStartup();
        }

        protected override void OnStopped()
        {
            base.OnStopped();
        }

        protected override bool Setup(IRootConfig rootConfig, IServerConfig config)
        {
            return base.Setup(rootConfig, config);
        }
    }
}
