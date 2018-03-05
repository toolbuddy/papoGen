### $Def$ 可加性(additivity) :
- 令 $f(x)$ 為一函數，$s,t \in D_f$。若$f(s) + f(t) = f(s+t) , \forall ~s,t$。則我們稱 $f(x)$ 具有**可加性**

- 範例： Let $f(x)=87x$，$s,t \in D_f$.Then：
$f(s)+f(t)=87s+87t=87(s+t)=f(s+t)$
$Therefore, f(x)~is~an~additivity~function.$

- 範例：Let $f(x) = \int x {\rm d}x$，$s=ax+b~,~t=cx+d$.Then：
$s+t= (a+b)x+(c+d)$
$f(s) = \int (ax+b) {\rm d}x = \frac{1}{2}ax^2+bx+C$
$f(t) = \int (cx+d) {\rm d}x = \frac{1}{2}cx^2+dx+C$<
$f(s)+f(t) = \frac{1}{2}(a+c)x^2+(b+d)x+C$
$f(s+t) = \int [(a+b)x+(c+d)] {\rm d}x = \frac{1}{2}(a+b)x^2+(c+d)x+C$
$f(s)+f(t)=f(s+t)=\frac{1}{2}(a+b)x^2+(c+d)x+C$
$f(x)$ is additivity when $s,t \in P_1$
 作者碎碎念：事實上對於$n$次多項式都有這性質，就是微積分裡面常見的$\int (f(x) \pm g(x)) {\rm d}x = \int f(x) {\rm d}x \pm \int g(x) {\rm d}x$。不過在這邊我只是為了展示可加性，所以就不證明它了( ´ ▽ ` )ﾉ

 - 範例：Let $f(x)=94x+87$，$s,t \in D_f.$Then：
 $f(s)+f(t)=(94s+87)+(94t+87)=94(s+t)+174$
 $f(s+t)=94(s+t)+87 \neq f(s)+f(t)=94(s+t)+174$
 $Therefore, f(x)~is~not~an~additivity~function.$