package com.example.deliverytogetherbackend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;

@Component
public class JwtTokenHelper {

    private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    @Value("${jwt.auth.app_name}")
    private String appName;

    @Value("${jwt.auth.secret_key}")
    private String secretKey;

    @Value("${jwt.auth.expires_in}")
    private int expiresIn;

    /* JWT를 생성하는 메서드 */
    public String generateToken(String username) throws InvalidKeySpecException, NoSuchAlgorithmException {

        return Jwts.builder()
                .setIssuer(appName)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(generateExpirationDate())
                .signWith(SIGNATURE_ALGORITHM, secretKey)
                .compact();
    }

    /* JWT가 가지는 모든 클레임을 반환하는 메서드 */
    private Claims getAllClaimsFromToken(String token) {
        Claims claims;

        try {
            claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }

        return claims;
    }

    /* JWT가 가지는 username을 반환하는 메서드 */
    public String getUsernameFromToken(String token) {
        String username;

        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }

        return username;
    }

    /* JWT의 만료시간을 설정하는 메서드 */
    private Date generateExpirationDate() {
        return new Date(new Date().getTime() + expiresIn * 1000);
    }

    /* 특정 JWT가 유효한지 판단하는 메서드 */
    public Boolean isTokenValidate(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);

        return (
                username != null
                        && username.equals(userDetails.getUsername())
                        && !isTokenExpired(token)
        );
    }

    /* JWT의 만료시간이 지났는지 판단하는 메서드 */
    public boolean isTokenExpired(String token) {
        Date expireDate = getExpirationDateFromToken(token);

        return expireDate.before(new Date());
    }

    /* JWT의 만료시간을 반환하는 메서드 */
    private Date getExpirationDateFromToken(String token) {
        Date expireDate;

        try {
            final Claims claims = this.getAllClaimsFromToken(token);

            expireDate = claims.getExpiration();
        } catch (Exception e) {
            expireDate = null;
        }

        return expireDate;
    }

    /* JWT의 발급시간을 반환하는 메서드 */
    public Date getIssuedDateFromToken(String token) {
        Date issuedAt;

        try {
            final Claims claims = this.getAllClaimsFromToken(token);

            issuedAt = claims.getIssuedAt();
        } catch (Exception e) {
            issuedAt = null;
        }

        return issuedAt;
    }

    /* 클라이언트 요청의 토큰 정보를 반환하는 메서드 */
    public String getToken(HttpServletRequest request) {
        String authHeader = getAuthHeaderFromHeader(request);

        if (authHeader != null && authHeader.startsWith("Bearer "))
            return authHeader.substring(7);

        return null;
    }

    /* 클라이언트 요청의 헤더 정보를 반환하는 메서드 */
    public String getAuthHeaderFromHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

}
