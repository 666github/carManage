using SuperSocket.SocketBase.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SuperSocket.SocketBase;
using System.Net;

namespace CarManageSystem.Service
{
    public class GPSReceiveFilterFactory: IReceiveFilterFactory<GPSRequestInfo>
    {
        public IReceiveFilter<GPSRequestInfo> CreateFilter(IAppServer appServer, IAppSession appSession, IPEndPoint remoteEndPoint)
        {
            return new GPSReceiveFilter();
        }

    }
}
