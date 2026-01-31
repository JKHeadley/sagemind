#!/bin/bash
# Vercel DNS Setup for sagemindai.io
# Run this AFTER switching nameservers to Vercel

DOMAIN="sagemindai.io"

echo "Setting up DNS records for $DOMAIN..."

# =====================
# Website (Vercel)
# =====================
echo "Adding website records..."
vercel dns add $DOMAIN '@' A 76.76.21.21
vercel dns add $DOMAIN www A 76.76.21.21

# =====================
# TXT Records
# =====================
echo "Adding TXT records..."

# SPF for SendGrid
vercel dns add $DOMAIN '@' TXT "v=spf1 include:sendgrid.net ~all"

# DMARC
vercel dns add $DOMAIN _dmarc TXT "v=DMARC1; p=none;"

# Google Site Verification (USER: verify this value is complete)
# vercel dns add $DOMAIN '@' TXT "google-site-verification=_kURIKT51QT0VkBZEH5luLmiu..."

# =====================
# SendGrid DKIM (CNAME)
# =====================
echo "Adding SendGrid DKIM records..."
vercel dns add $DOMAIN s1._domainkey CNAME s1.domainkey.u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN s2._domainkey CNAME s2.domainkey.u44932180.wl181.sendgrid.net

# =====================
# SendGrid Link Branding (CNAME)
# =====================
echo "Adding SendGrid link branding records..."
vercel dns add $DOMAIN 44932180 CNAME sendgrid.net
vercel dns add $DOMAIN url006 CNAME sendgrid.net
vercel dns add $DOMAIN url897 CNAME sendgrid.net
vercel dns add $DOMAIN url3432 CNAME sendgrid.net
vercel dns add $DOMAIN url4049 CNAME sendgrid.net
vercel dns add $DOMAIN url5720 CNAME sendgrid.net
vercel dns add $DOMAIN url6342 CNAME sendgrid.net
vercel dns add $DOMAIN url9815 CNAME sendgrid.net

# =====================
# SendGrid Email CNAME (em* records)
# =====================
echo "Adding SendGrid email CNAME records..."
vercel dns add $DOMAIN em3096 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em3550 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em3972 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em4459 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em4478 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em5868 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em6829 CNAME u44932180.wl181.sendgrid.net
vercel dns add $DOMAIN em9574 CNAME u44932180.wl181.sendgrid.net

# =====================
# Intercom
# =====================
echo "Adding Intercom records..."
vercel dns add $DOMAIN outbound.intercom CNAME rp.sagemind-ai.intercom-mail.com
# DKIM for Intercom (truncated in screenshot - verify full value)
# vercel dns add $DOMAIN intercom._domainkey CNAME 862c2054-484e-4beb-adc8-7a567b6aa577.dkim.intercom.io

# =====================
# n8n Automation (Heroku)
# =====================
echo "Adding n8n records..."
# These hostnames/values were truncated in screenshot - verify full values
# vercel dns add $DOMAIN n8n CNAME metaphysical-squid-yvw62hvet9gfqhjr8md6g.herokudns.com
# vercel dns add $DOMAIN n8n.b2lead CNAME corrugated-chpmunk-s2g0s52paq9ki7x5mjas2h.herokudns.com
# vercel dns add $DOMAIN n8n.headley-fis... CNAME hidden-beetle-xh0cah3e5c79d4angawii2.herokudns.com

echo ""
echo "✓ DNS setup complete!"
echo ""
echo "IMPORTANT: Some records were commented out because values were truncated."
echo "Please verify and manually add:"
echo "  - Google site verification TXT record"
echo "  - Intercom DKIM record"
echo "  - n8n/Heroku CNAME records"
echo ""
echo "Run 'vercel dns ls sagemindai.io' to verify all records."
