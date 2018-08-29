﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GPSTest
{
    public partial class Form1 : Form
    {
        public Dictionary<int, TcpArgs> dic_Tcp = new Dictionary<int, TcpArgs>();
        static List<string> listCar = new List<string>()
        {
            "898600690117f0111523",
            "898600690117f0011154",
            "898600690117f0011155"
        };

        public Form1()
        {
            InitializeComponent();
            r1_middle.Checked = true;
            r2_middle.Checked = true;
            r_middle.Checked = true;
            foreach(var control in this.Controls)
            {
                foreach(var r in (control as GroupBox).Controls)
                {
                    if((r as RadioButton)!=null)
                    {
                        (r as RadioButton).Click += RadioChange;
                    }
                }
            }
        }

        private void btn_start_Click(object sender, EventArgs e)
        {
            ButtonClick(sender,1);
        }

        private void btn1_start_Click(object sender, EventArgs e)
        {
            ButtonClick(sender,2);
        }

        private void btn2_start_Click(object sender, EventArgs e)
        {
            ButtonClick(sender,3);
        }

        public void ButtonClick(object sender,int buttonNo)
        {
            Button btn = sender as Button;
            if(btn.Text=="启动")
            {
                TcpArgs tcpArgs = new TcpArgs(listCar[buttonNo-1]);
                tcpArgs.Start();
                lock(dic_Tcp)
                {
                    dic_Tcp.Add(buttonNo, tcpArgs);
                }
                btn.Text = "关闭";
            }
            else
            {
                var tcp = dic_Tcp.FirstOrDefault(s => s.Key == buttonNo);
                lock (dic_Tcp)
                {
                    dic_Tcp.Remove(buttonNo);
                }
                tcp.Value.Dispose();
                btn.Text = "启动";
            }
        }
        
        public void RadioChange(object sender , EventArgs args)
        {
            RadioButton radioButton = sender as RadioButton;
            var no = radioButton.Parent.Text;
            foreach(var a in radioButton.Parent.Controls)
            {
                if((a as Button)!=null)
                {
                    if((a as Button).Text=="启动")
                    {
                        MessageBox.Show("请先启动");
                        return;
                    }
                }
            }
            
            //MessageBox.Show(no);
            var tcp = dic_Tcp.FirstOrDefault(s => s.Key == Convert.ToInt32(no));
            tcp.Value.desination = Convert.ToInt32(radioButton.Tag);
        }
    }

    public class TcpArgs:IDisposable
    {
        static double step = 0.0004;
        public double x = 116.314460;
        public double y = 39.899778;

        public int desination { get; set; }
        public TcpClient tcpclient;
        public System.Threading.Timer timer;
        public NetworkStream stream;
       
        public TcpArgs(string carNumber)
        {
            string ip = ConfigurationManager.AppSettings.Get("ip");
            string port = ConfigurationManager.AppSettings.Get("port");
            tcpclient = new TcpClient(ip, Convert.ToInt32(port));
            stream = tcpclient.GetStream();
            desination = 0;
            timer = new System.Threading.Timer((t)=> 
            {
                try
                {
                    //MessageBox.Show("123");
                    switch (desination)
                    {
                        case 0: //中
                            break;
                        case 1://上
                            y += step;
                            break;
                        case 2://下
                            y -= step;
                            break;
                        case 3://左
                            x -= step;
                            break;
                        case 4://右
                            x += step;
                            break;
                        default: break;
                    }

                    //System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1)); // 当地时区
                    //long timeStamp = (long)(DateTime.Now - startTime).TotalSeconds; // 相差秒数

                    string message = string.Format("GPS|{2}|{0}|{1}|{3}", y, x, carNumber, DateTime.Now.ToString("HHmmss"));
                    byte[] data = Encoding.UTF8.GetBytes(message);
                    stream.Write(data, 0, data.Length);
                }
                catch(Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
                
            }, null, -1, -1);
        }

        public void Start()
        {
            timer.Change(1000, 6000);
        }

        public void Dispose()
        {
            timer.Dispose();
            stream.Close();
            tcpclient.Close();
            GC.SuppressFinalize(this);
        }
    }
}
