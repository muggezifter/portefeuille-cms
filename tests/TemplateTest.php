<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Portefeuille\Template;

final class TemplateTest extends TestCase
{
    public function testPushAndPop()
    {
        $stack = [];
        $this->assertEquals(0, count($stack));

        array_push($stack, 'foo');
        $this->assertEquals('foo', $stack[count($stack)-1]);
        $this->assertEquals(1, count($stack));

        $this->assertEquals('foo', array_pop($stack));
        $this->assertEquals(0, count($stack));
    }

    public function testConstructor() {
        define("TWIG_CACHEDIR", "cache");
        define("TWIG_TEMPLATEDIR", "templates");
        $t = new Template();
    }
}