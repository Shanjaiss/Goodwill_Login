import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { PhoneFilled, MailFilled } from "@ant-design/icons";
import Logo from "./assets/images/goodwill-logo.png";
import { useLocation, Outlet } from "react-router-dom";

const { Content } = Layout;
const { Text, Link } = Typography;

export const App = () => {
  const location = useLocation();
  const [apiKey, setApiKey] = useState(null);
  const [errorApiKeyMsg, setErrorApiKeyMsg] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get("api_key");

    if (key) {
      setApiKey(key);
      setErrorApiKeyMsg(null);
    } else {
      setApiKey(null);
      setErrorApiKeyMsg("Invalid Request");
    }
  }, [location.search]);

  return (
    <Row justify="center">
      <Col xs={22} sm={18} md={12} lg={8} xl={6}>
        <div className="login-container">
          {/* Logo */}
          <Row justify="center">
            <Col>
              <img
                className="logo"
                src={Logo}
                alt="Goodwill Logo"
                onClick={() => window.open("https://gwcindia.in/")}
              />
            </Col>
          </Row>

          <Content>
            {/* Use Outlet to render child components */}
            <Outlet context={{ apiKey, errorApiKeyMsg, setErrorApiKeyMsg }} />
          </Content>

          <div className="footer-container">
            <Row justify="center" className="login-footerHeader">
              <Col>
                <ul className="login-ulist">
                  <li>
                    <Text strong>Goodwill Wealth Management Pvt Ltd</Text>
                  </li>
                  <li>
                    <Text className="login-list">
                      MCX: 11095 | ICEX: 2035 | SEBI Regn. No : INZ000177036
                    </Text>
                  </li>
                  <li>
                    <Text className="login-list">
                      MSEI: 11240 | NSE: 90097 | BSE: 6648
                    </Text>
                  </li>
                </ul>
              </Col>
            </Row>
            <div className="support-info">
              <Row justify="center">
                <Col>
                  <Text style={{ whiteSpace: "nowrap" }}>
                    <PhoneFilled /> 044 40205050 (IVR-4) |{" "}
                    <Link
                      href="mailto:apisupport@gwcindia.in"
                      className="support-link custom-link "
                    >
                      <MailFilled style={{ color: "black" }} />{" "}
                      apisupport@gwcindia.in
                    </Link>
                  </Text>
                </Col>
              </Row>
              <Col>
                <Link
                  href="https://ekyc.gwcindia.in/client/"
                  target="_blank"
                  className="signup-link custom-link"
                >
                  Don't have an account? Signup now!
                </Link>
              </Col>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
