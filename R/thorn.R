#' HTML widget displaying a shader
#'
#' @description Creates a HTML widget displaying a shader.
#'
#' @param shader the name of the shader, one of \code{"thorn"},
#'   \code{"thorn-color"}, \code{"ikeda"}, \code{"sweet"}, \code{"biomorph1"},
#'   \code{"biomorph2"}, or \code{"biomorph3"}
#' @param width,height a valid CSS measurement (like \code{"100\%"},
#'   \code{"400px"}, \code{"auto"}) or a number, which will be coerced to a
#'   string and have \code{"px"} appended
#' @param elementId a HTML id for the widget
#'
#' @import htmlwidgets
#'
#' @export
#'
#' @examples library(thorn)
#' thorn("ikeda") # click on the shader to animate it
#'
#' # four shaders: ####
#' library(htmltools)
#'
#' hw1 <- thorn("thorn-color", width = "50vw", height = "50vh")
#' hw2 <- thorn("ikeda", width = "50vw", height = "50vh")
#' hw3 <- thorn("sweet", width = "50vw", height = "50vh")
#' hw4 <- thorn("biomorph3", width = "50vw", height = "50vh")
#'
#' browsable(
#'   withTags(
#'     div(
#'       div(
#'         style = "position:absolute; top:0;",
#'         div(hw1, style="position:fixed; left:0;"),
#'         div(hw2, style="position:fixed; left:50vw;")
#'       ),
#'       div(
#'         style = "position:absolute; top:50vh;",
#'         div(hw3, style="position:fixed; left:0;"),
#'         div(hw4, style="position:fixed; left:50vw;")
#'       )
#'     )
#'   )
#' )
thorn <- function(
  shader,
  width = NULL, height = NULL,
  elementId = NULL
) {

  # forward options using x
  x = list(
    shader = match.arg(shader, c(
      "thorn",
      "thorn-color",
      "ikeda",
      "biomorph1",
      "biomorph2",
      "biomorph3",
      "sweet"
    ))
  )

  # create widget
  htmlwidgets::createWidget(
    name = "thorn",
    x,
    width = width,
    height = height,
    package = "thorn",
    elementId = elementId
  )
}

#' Shiny bindings for \code{thorn}
#'
#' Output and render functions for using \code{\link{thorn}} within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height a valid CSS measurement (like \code{"100\%"},
#'   \code{"400px"}, \code{"auto"}) or a number, which will be coerced to a
#'   string and have \code{"px"} appended
#' @param expr an expression that generates a shader created with
#'   \code{\link{thorn}}
#' @param env the environment in which to evaluate \code{expr}
#' @param quoted logical, whether \code{expr} is a quoted expression
#'
#' @name thorn-shiny
#'
#' @export
thornOutput <- function(outputId, width = "100%", height = "100%"){
  htmlwidgets::shinyWidgetOutput(
    outputId, "thorn", width, height, package = "thorn"
  )
}

#' @rdname thorn-shiny
#' @export
renderThorn <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, thornOutput, env, quoted = TRUE)
}
