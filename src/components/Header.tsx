import {
    EuiHeader,
    EuiText,
    EuiAvatar,
    EuiPopover,
    EuiPopoverTitle,
    EuiPopoverFooter,
    EuiButton,
    EuiSpacer,
  } from "@elastic/eui";
  import { signOut } from "firebase/auth";
  import { useEffect, useState } from "react";

  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { useAppSelector } from "../app/hooks";

  import {
    getCreateMeetingBreadCrumbs,
    getDashboardBreadCrumbs,
    getMeetingsBreadCrumbs,
    getMyMeetingsBreadCrumbs,
    getOneOnOneMeetingBreadCrumbs,
    getVideoConferenceBreadCrumbs,
  } from "../utils/breadcrumbs";
import { firebaseAuth } from "../utils/FirebaseConfig";
  import { BreadCrumbsType } from "../utils/types";
  import { LogoutIcon } from "./SVGIcons";
  
  export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.name);
    const userEmail = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.email);
    const [breadCrumbs, setBreadCrumbs] = useState<Array<BreadCrumbsType>>([
      {
        text: "Dashboard",
      },
    ]);
    const [isResponsive, setIsResponsive] = useState(false);
    const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);
  
    useEffect(() => {
      const { pathname } = location;
      if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
      else if (pathname === "/create")
        setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
      else if (pathname === "/create1on1")
        setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
      else if (pathname === "/videoconference")
        setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
      else if (pathname === "/mymeetings")
        setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate));
      else if (pathname === "/meetings") {
        setBreadCrumbs(getMeetingsBreadCrumbs(navigate));
      }
    }, [location, navigate]);
  
    const logout = () => {
      signOut(firebaseAuth);
    };
  
    const userPopoverButton = (
      <div
        onClick={() => setIsUserPopoverOpen(!isUserPopoverOpen)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <EuiAvatar
          name={userName || 'User'}
          size="s"
          color="subdued"
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <EuiText size="s" style={{ color: 'white', fontWeight: 600 }}>
            {userName || 'User'}
          </EuiText>
          <EuiText size="xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {userEmail}
          </EuiText>
        </div>
      </div>
    );

    const section = [
      {
        items: [
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>B</span>
              </div>
              <EuiText>
                <h2 style={{ 
                  margin: 0,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 700,
                  fontSize: '24px'
                }}>
                  Boom
                </h2>
              </EuiText>
            </div>
          </Link>,
        ],
      },
              {
          items: [
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <EuiPopover
                button={userPopoverButton}
                isOpen={isUserPopoverOpen}
                closePopover={() => setIsUserPopoverOpen(false)}
                panelPaddingSize="m"
                anchorPosition="downRight"
              >
                <div style={{ minWidth: '250px' }}>
                  <EuiPopoverTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <EuiAvatar name={userName || 'User'} size="m" />
                      <div>
                        <EuiText size="s" style={{ fontWeight: 600 }}>
                          {userName || 'User'}
                        </EuiText>
                        <EuiText size="xs" color="subdued">
                          {userEmail}
                        </EuiText>
                      </div>
                    </div>
                  </EuiPopoverTitle>
                  <EuiSpacer size="s" />
                  <EuiPopoverFooter>
                    <EuiButton
                      onClick={logout}
                      color="danger"
                      size="s"
                      iconType="exit"
                      fill
                      fullWidth
                    >
                      Sign Out
                    </EuiButton>
                  </EuiPopoverFooter>
                </div>
              </EuiPopover>
            </div>,
          ],
        },
    ];
  
    const responsiveSection = [
      {
        items: [
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>B</span>
              </div>
              <EuiText>
                <h3 style={{ 
                  margin: 0,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 700,
                  fontSize: '20px'
                }}>
                  Boom
                </h3>
              </EuiText>
            </div>
          </Link>,
        ],
      },
              {
          items: [
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                onClick={logout}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'rgba(245, 87, 108, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(245, 87, 108, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon size={16} />
              </div>
            </div>,
          ],
        },
    ];
  
    useEffect(() => {
      if (window.innerWidth < 480) {
        // sectionSpliced.splice(1, 1);
        // setSection(sectionSpliced);
        setIsResponsive(true);
      }
    }, []);
  
    return (
      <>
        <EuiHeader
          style={{ 
            minHeight: "10vh",
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(102, 126, 234, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
          theme="dark"
          sections={isResponsive ? responsiveSection : section}
        />
        <EuiHeader
          style={{ 
            minHeight: "5vh",
            background: 'rgba(22, 33, 62, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'sticky',
            top: '10vh',
            zIndex: 999,
          }}
          theme="dark"
          sections={[
            {
              breadcrumbs: breadCrumbs.map(crumb => ({
                ...crumb,
                style: {
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                }
              })),
            },
          ]}
        />
      </>
    );
  }
